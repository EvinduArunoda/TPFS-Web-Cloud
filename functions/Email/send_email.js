const admin = require('firebase-admin');
const SendGridKey = require('../util/sendGridKey');
const Util = require('../util/util');
const sgMail = require('@sendgrid/mail');

module.exports.sendEmail =  async (data) => {
    console.log ('Starting function SEND EMAIL >>>> HERE');

    sgMail.setApiKey(SendGridKey.SENDGRID_API_KEY);

    return await sgMail.send(data).then(res=>res).catch(err=>err.response.body);

};
