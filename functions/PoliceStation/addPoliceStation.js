const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');

exports.handler = async (data, context) => {
    try {
        util.handleAuth(context);
        const firestore = admin.firestore();

        const address = util.checkString(data['address']);
        const region = util.checkString(data['region']);
        const email = util.checkemail(data['email']);
        const phone_number = util.checkString(data['phone_number']);
        const station_id = util.checkString(data['station_id']);
        const password = util.checkString(data['password']);

        const policeStationSnaps = await firestore.collection('WebUser').where('email', '==', email).get();
        const policeStationDocs = policeStationSnaps.docs;

        if (policeStationDocs.length !== 0) {
            return ({
                'status': 'error',
                'message': 'Email is Already Used'
            });
        } else {
            const policeStationRef = firestore.collection(DBUtil.POLICESTATION).doc();
            await policeStationRef.set({
                address,
                email,
                region,
                phone_number,
                station_id,
                'type' : 'policeStation'
            });
            console.log('done')

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