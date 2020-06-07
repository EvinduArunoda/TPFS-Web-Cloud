const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');
const emailHandler = require('../Email/send_email');

exports.handler = async (data, context) => {
    try {
        util.handleAuth(context);
        const firestore = admin.firestore();

        const LicenseNumber = util.checkString(data['LicenseNumber']);
        const PhoneNumber = util.checkString(data['PhoneNumber']);
        const address = util.checkString(data['address']);
        const emailAddress = util.checkemail(data['emailAddress']);
        const name = util.checkString(data['name']);
        const nic = util.checkString(data['NIC']);
        // const password = util.checkString(data['password']);
        const password = util.makePassword(3);

        const driverSnaps = await firestore.collection('Drivers').where('emailaddress', '==', emailAddress).get();
        const driverDocs = driverSnaps.docs;

        const driverSnapsLisID = await firestore.collection('Drivers').where('LicenseNumber', '==', LicenseNumber).get();
        const driverDocsLisID = driverSnapsLisID.docs;

        if (driverDocs.length !== 0) {
            return ({
                'status': 'error',
                'message': 'Email is Already Used'
            });
        } else if (driverDocsLisID.length !== 0) {
            return ({
                'status': 'error',
                'message': 'License number is Already Used'
            });
        } else {
            const ID = util.makeID(3);

            const driverRef = firestore.collection(DBUtil.DRIVER).doc(ID);
            await driverRef.set({
                'Class' : null,
                LicenseNumber,
                'NIC' : nic,
                'name' : name,
                'emailaddress' : emailAddress,
                'phonenumber': PhoneNumber,
                address,
                'physicaldisabilities': null
            });
            console.log('done')

            await admin.auth().createUser({
                uid:ID,
                email: emailAddress,
                emailVerified: false,
                password: password,
            });

            const msg = {
                to: emailAddress,
                from: 'tpfs@email.com',
                subject: 'Account Verification',
                text: 'Your initial password for tpfs web application is : ' + password,
                html: `<strong>Your initial password for tpfs web application is : ${password}</strong>`,
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