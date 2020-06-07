const admin = require('firebase-admin');
const DBUtil = require('../util/db_util');
const Util = require('../util/util');
const sgMail = require('@sendgrid/mail');

module.exports.sendEmail =  async (data) => {
    console.log ('Starting function SEND EMAIL >>>> HERE');

    sgMail.setApiKey(DBUtil.SENDGRID_API_KEY);

    return await sgMail.send(data).then(res=>res).catch(err=>err.response.body);

};
