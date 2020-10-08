#include <Arduino.h>
#include <MySGP30.h>

MySGP30 sgp;

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

int counter = 0;

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

    Serial.print("eCO2 ");
    Serial.print(sgp.getECO2());
    Serial.println(" ppm");

    delay(100);

    counter++;
    if (counter == 300) {
        counter = 0;

        if (!sgp.canGetIAQBaseLine()) {
            Serial.println("Failed to get baseline readings");
            return;
        }
        Serial.print("****Baseline: ");
        Serial.println("eCO2: 0x" + String(sgp.getECO2Base(), HEX));
        Serial.println(" & TVOC: 0x" + String(sgp.getTVOCBase(), HEX));
    }
}