const functions = require('firebase-functions');
const admin = require('firebase-admin');

const AddPoliceMen = require('./PoliceMen/addPoliceMen');
const AddPoliceStation = require('./PoliceStation/addPoliceStation');

const TestAddPoliceMen = require('./PoliceMen/testAddPoliceMen');
admin.initializeApp();

// Functions
exports.AddPoliceMen = functions.https.onCall(AddPoliceMen.handler);
exports.AddPoliceStation = functions.https.onCall(AddPoliceStation.handler);

// Testing Functions
exports.TestAddPoliceMen = functions.https.onRequest(TestAddPoliceMen.handler);
