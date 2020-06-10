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
const CheckExpiredTickets = require('./Scheduler/ticketDueCheck');
const TestAddPoliceMen = require('./PoliceMen/testAddPoliceMen');
const SendCode = require('./ResetPassword/SendCode');
const CheckCode = require('./ResetPassword/CheckCode');
const ResetPassword = require('./ResetPassword/ResetPassword');
admin.initializeApp();

// New Account creating Functions
exports.AddPoliceMen = functions.https.onCall(AddPoliceMen.handler);
exports.AddPoliceStation = functions.https.onCall(AddPoliceStation.handler);
exports.AddDriver = functions.https.onCall(AddDriver.handler);
exports.AddPhysicalDisabilities = functions.https.onCall(AddPhysicalDisabilities.handler);
exports.AssignPoliceStation = functions.https.onCall(AssignPoliceStation.handler);
exports.AddVehicle = functions.https.onCall(AddVehicle.handler);
exports.AddVehicleDetails = functions.https.onCall(AddVehicleDetails.handler);
exports.AddManualPayment = functions.https.onCall(AddManualPayment.handler);

// Reset password functions
exports.SendCode = functions.https.onCall(SendCode.handler);
exports.CheckCode = functions.https.onCall(CheckCode.handler);
exports.ResetPassword = functions.https.onCall(ResetPassword.handler);

// Ticket Due date checking function
exports.CheckExpiredTickets = functions.pubsub.schedule('every 60 minutes').onRun(CheckExpiredTickets.handler);

// Testing Functions
exports.TestAddPoliceMen = functions.https.onRequest(TestAddPoliceMen.handler);
