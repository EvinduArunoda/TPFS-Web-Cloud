const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');

exports.handler = async (request, response) => {
    try {
        // util.handleAuth(context);
        const firestore = admin.firestore();

        const email = util.checkString(request.body['email']);
        const disabilities = request.body['disabilities'];
        const Class = data['Class'];

        const driverSnaps = await firestore.collection('Drivers').where('emailaddress', '==', email).get();
        const driverDocs = driverSnaps.docs;

        await driverDocs[0].ref.update({
            'physicaldisabilities': disabilities,
            Class
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