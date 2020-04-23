const functions = require('firebase-functions');
const admin = require('firebase-admin');

const AddPoliceMen = require('./PoliceMen/addPoliceMen');
admin.initializeApp();

exports.AddPoliceMen = functions.https.onCall(AddPoliceMen.handler);


