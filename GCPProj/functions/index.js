const functions = require('firebase-functions');
const loggingClient = require('@google-cloud/logging');
const ENV = require('./ENV.json');

// ******************** Firestore
const admin = require('firebase-admin');
const SERVICE_ACCOUNT = require('./service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT),
});
// ********************

// create the Stackdriver Logging client
const logging = new loggingClient({
  projectId: process.env.GCLOUD_PROJECT,
});

// start cloud function
exports.deviceLog = functions
  .region('asia-northeast1')
  .pubsub.topic('device-logs')
  .onPublish((message) => {
    const log = logging.log('device-logs');
    const metadata = {
      // Set the Cloud IoT Device you are writing a log for
      // you extract the required device info from the PubSub attributes
      resource: {
        type: 'cloudiot_device',
        labels: {
          project_id: message.attributes.projectId,
          device_num_id: message.attributes.deviceNumId,
          device_registry_id: message.attributes.deviceRegistryId,
          location: message.attributes.location,
        },
      },
      labels: {
        // note device_id is not part of the monitored resource, but you can
        // include it as another log label
        device_id: message.attributes.deviceId,
      },
    };

    let logData;
    try {
      logData = message.json;
    } catch (e) {
      return 0;
    }

    // ******************** Firestore
    const db = admin.firestore();
    getUserDoc().then((result) => {
      const user = result;
      const AGE = user.age;
      const WEIGHT = user.weight;
      const RHR = user.rhr;
      const HRMAX = user.hrmax != -1 ? user.hrmax : 220 - AGE;
      const VO2MAX =
        user.vo2max != -1 ? user.vo2max : (15 * parseFloat(HRMAX)) / RHR;
      const HRR = HRMAX - RHR;
      const pHRR = parseFloat(logData.HR) / parseFloat(HRR);
      const VO2 = VO2MAX * pHRR;
      const EE =
        (3.9 * VO2) / WEIGHT + (1.1 * logData.CO2ProdRaw * 0.001) / WEIGHT;
      getRecordDoc().then((result) => {
        const ee = result;
        const date = new Date(
          Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
        );
        const today =
          '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
        db.collection('users/testuser/records')
          .doc(today)
          .set({
            ee: ee + EE,
          });
      });
    });
    // ******************** Firestore

    // write the log entry to Stackdriver Logging
    const entry = log.entry(metadata, logData);
    return log.write(entry);
  });

const getUserDoc = () => {
  console.log('run getUserDoc');
  return new Promise((resolve) => {
    const db = admin.firestore();
    db.collection('users')
      .doc('testuser')
      .get()
      .then((doc) => {
        resolve(doc.data().profile);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const getRecordDoc = () => {
  console.log('run getRecordDoc');
  return new Promise((resolve) => {
    const db = admin.firestore();
    const date = new Date(
      Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
    );
    const today =
      '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
    console.log(today);
    db.collection('users/testuser/records')
      .doc(today)
      .get()
      .then((doc) => {
        resolve(doc.data().ee);
      })
      .catch((err) => {
        db.collection('users/testuser/records').doc(today).set({
          ee: 0,
        });
      });
  });
};
