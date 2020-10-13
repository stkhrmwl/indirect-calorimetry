#include <Arduino.h>
#include <MySGP30.h>
#include <math.h>

MySGP30 sgp;

void measure();
void calc();

const int N = 10;
int countBreathing = 0, countCanCalc = 0;
double vals[N], rate, co2max, co2min, co2prod = 0;
bool isReached = false;
// 1分間の呼吸回数
// 各呼吸における二酸化炭素排出量を1分間記録

void calc() {
    const int HR = 60, VO2MAX = 60, AGE = 20, W = 70;
    const int HRR = 220 - AGE - HR;
    int hr = 4 * countBreathing;
    double pHRR = (double)hr / (double)HRR;
    Serial.println("%HRR: " + String(pHRR));
    double vo2 = VO2MAX * pHRR;
    double e = 3.9 * vo2 / W + 1.1 * co2prod * 0.001 / W;
    co2prod = 0;
    Serial.println("エネルギー: " + String(e));
}

void measure() {
    rate = ((vals[0] - vals[9]) / vals[9]) * 100;
    if (rate > 30 && !isReached) {
        Serial.println("TOP");
        co2max = vals[9];
        isReached = true;
        countCanCalc++;
    } else if (rate < -30 && isReached) {
        Serial.println("BTM");
        co2min = vals[9];
        isReached = false;
        countCanCalc++;
    }
    if (countCanCalc == 2) {
        co2prod += fabs(co2max - co2min);
        countBreathing++;
        countCanCalc = 0;
        Serial.println("CO2生成量: " + String(co2prod));
    }

    for (int i = N - 1; i > 0; i--) {
        vals[i] = vals[i - 1];
    }
    vals[0] = sgp.getECO2();
}

unsigned long lastResetingTime = 0;
const unsigned long resetingInterval = 60 * 1000L; // 60 sec

void setup() {
    Serial.begin(115200);
    delay(5000);
    Serial.println("SGP30 MASK TEST");
    while (!sgp.isEnabled()) {
        Serial.println("Sensor not found");
    }
    Serial.println("Found SGP30 serial: " + String(sgp.getSerial()));

    /*
      If you have a baseline measurement from before you can assign it to start,
      to 'self-calibrate' sgp.setIAQBaseline(0x8E68, 0x8F41); Will vary for each
      sensor!
      */
}

void loop() {

    /*
      @params float temperature, humidity
      sgp.getHumidity(temperature, humidity);
      */

    if (!sgp.canMeasureIAQ()) {
        Serial.println("Measurement failed");
        return;
    }

    if (!sgp.canMeasureRawIAQ()) {
        Serial.println("Raw Measurement failed");
        return;
    }

    if (millis() - lastResetingTime > resetingInterval) {
        Serial.println("************************************");
        lastResetingTime = millis();
        Serial.println(co2prod);
        Serial.println(countBreathing);
        calc();
        co2prod = 0;
        countBreathing = 0;
        Serial.println("************************************");
    }

    Serial.print("eCO2 ");
    Serial.print(sgp.getECO2());
    Serial.println(" ppm");

    measure();

    delay(100);
}