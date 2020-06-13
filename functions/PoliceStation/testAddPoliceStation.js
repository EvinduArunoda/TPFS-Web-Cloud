const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');
const emailHandler = require('../Email/send_email');

exports.handler = async (request, response) => {
    try {
        // util.handleAuth(context);
        const firestore = admin.firestore();

        const address = util.checkString(request.body['address']);
        const region = util.checkString(request.body['region']);
        const email = util.checkemail(request.body['email']);
        const phone_number = util.checkString(request.body['phone_number']);
        const station_id = util.checkString(request.body['station_id']);
        // const password = util.checkString(data['password']);
        const rta = util.checkemail(request.body['rta']);

        const password = util.makePassword(3);

        const policeStationSnaps = await firestore.collection('WebUser').where('email', '==', email).get();
        const policeStationDocs = policeStationSnaps.docs;

        const RTA = await firestore.collection('WebUsers').where('email','==',rta).get();
        const RTADoc = RTA.docs;

        if (policeStationDocs.length !== 0) {
            response.send({
                'status': 'error',
                'message': 'Email is Already Used'
            });
        } else {
            const ID = util.makeID(3);
            await admin.auth().createUser({
                uid:ID,
                email: email,
                emailVerified: false,
                password: password,
            });
            const policeStationRef = firestore.collection(DBUtil.USER).doc(ID);

            await policeStationRef.set({
                address,
                email,
                region,
                phone_number,
                station_id,
                'type' : 'policeStation',
                'rta': RTADoc[0].ref
            });
            console.log('done')
            const msg = {
                to: email,
                from: 'tpfsuom@gmail.com',
                subject: 'Account Verification',
                text: 'Your initial password for tpfs web application is : ' + password,
                html: `<strong>Your initial password for tpfs web application is : ${password}</strong>`,
            };
            await emailHandler.sendEmail(msg);

            response.send({
                'status': 'success'
            });
        }

    } catch (e) {
        console.log(e.message)

        response.send({
            'status': 'error',
            'message': e.message
        });
    }
}