const functions = require('firebase-functions');
const admin = require('firebase-admin');

const AddPoliceMen = require('./PoliceMen/addPoliceMen');
const AddPoliceStation = require('./PoliceStation/addPoliceStation');
const AddDriver = require('./Driver/addDriver');
const AddPhysicalDisabilities = require('./Driver/addPhysicalDisabilities');
const AssignPoliceStation = require('./PoliceMen/assignPoliceStation');
const AddVehicle = require('./Vehicle/addVehicle');
const AddVehicleDetails = require('./Vehicle/addVehicleDetails');
const AddManualPayment = require('./Ticket/addManualPayment');

const TestAddPoliceMen = require('./PoliceMen/testAddPoliceMen');
admin.initializeApp();

// Functions
exports.AddPoliceMen = functions.https.onCall(AddPoliceMen.handler);
exports.AddPoliceStation = functions.https.onCall(AddPoliceStation.handler);
exports.AddDriver = functions.https.onCall(AddDriver.handler);
exports.AddPhysicalDisabilities = functions.https.onCall(AddPhysicalDisabilities.handler);
exports.AssignPoliceStation = functions.https.onCall(AssignPoliceStation.handler);
exports.AddVehicle = functions.https.onCall(AddVehicle.handler);
exports.AddVehicleDetails = functions.https.onCall(AddVehicleDetails.handler);
exports.AddManualPayment = functions.https.onCall(AddManualPayment.handler);

// Testing Functions
exports.TestAddPoliceMen = functions.https.onRequest(TestAddPoliceMen.handler);
