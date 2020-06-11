const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');
const emailHandler = require('../Email/send_email');

exports.handler = async (data, context) => {
    try {
        util.handleAuth(context);
        const firestore = admin.firestore();

        const address = util.checkString(data['address']);
        const employee_id = util.checkString(data['employee_id']);
        const first_name = util.checkString(data['first_name']);
        const last_name = util.checkString(data['last_name']);
        const mail_id = util.checkemail(data['mail_id']);
        const phone_number = util.checkString(data['phone_number']);
        // const password = util.checkString(data['password']);

        const password = util.makePassword(3);

        const policeMenSnaps = await firestore.collection('PoliceMen').where('mail_id', '==', mail_id).get();
        const policeMenDocs = policeMenSnaps.docs;

        const policeMenSnapsEmpID = await firestore.collection('PoliceMen').where('employee_id', '==', employee_id).get();
        const policeMenDocsEmpID = policeMenSnapsEmpID.docs;

        if (policeMenDocs.length !== 0) {
            return ({
                'status': 'error',
                'message': 'Email is Already Used'
            });
        } else if (policeMenDocsEmpID.length !== 0) {
            return ({
                'status': 'error',
                'message': 'EmployeeID is Already Used'
            });
        } else {
            const ID = util.makeID(3);

            const policeMenRef = firestore.collection(DBUtil.POLICEMEN).doc(ID);
            await policeMenRef.set({
                address,
                employee_id,
                first_name,
                last_name,
                mail_id,
                phone_number,
                'station_id':null
            });
            console.log('done')

            await admin.auth().createUser({
                uid:ID,
                email: mail_id,
                emailVerified: false,
                password: password,
            });

            const msg = {
                to: mail_id,
                from: 'tpfsuom@gmail.com',
                subject: 'Account Verification',
                text: 'Your initial password for tpfs policeman mobile application is : ' + password,
                html: `<strong>Your initial password for tpfs policeman mobile application is : ${password}</strong>`,
            };
            await emailHandler.sendEmail(msg);

            return ({
                'status': 'success'
            });
        }

    } catch (e) {
        console.log(e.message)

        return ({
            'status': 'error',
            'message': e.message
        });
    }
}