const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');

exports.handler = async (data, context) => {
    try {
        util.handleAuth(context);
        const firestore = admin.firestore();

        const email = util.checkemail(data['email']);
        const station = data['station'];

        const driverSnaps = await firestore.collection('PoliceMen').where('mail_id', '==', email).get();
        const driverDocs = driverSnaps.docs;

        await driverDocs[0].ref.update({
            'station_id': station
        });


        return ({
            'status': 'success'
        });


    } catch (e) {
        console.log(e.message)

        return ({
            'status': 'error',
            'message': e.message
        });
    }
}