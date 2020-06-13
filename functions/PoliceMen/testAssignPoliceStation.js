const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');

exports.handler = async (request, response) => {
    try {
        const firestore = admin.firestore();

        const email = util.checkemail(request.body['email']);
        const station = request.body['station'];

        const driverSnaps = await firestore.collection('PoliceMen').where('mail_id', '==', email).get();
        const driverDocs = driverSnaps.docs;

        await driverDocs[0].ref.update({
            'station_id': station
        });


        response.send({
            'status': 'success'
        });


    } catch (e) {
        console.log(e.message)

        response.send({
            'status': 'error',
            'message': e.message
        });
    }
}