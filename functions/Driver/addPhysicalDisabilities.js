const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');

exports.handler = async (data, context) => {
    try {
        util.handleAuth(context);
        const firestore = admin.firestore();

        const email = util.checkString(data['email']);
        const disabilities = data['disabilities'];
        const Class = data['Class'];

        const driverSnaps = await firestore.collection('Drivers').where('emailaddress', '==', email).get();
        const driverDocs = driverSnaps.docs;

        await driverDocs[0].ref.update({
            'physicaldisabilities': disabilities,
            Class
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