const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');

exports.handler = async (data, context) => {
    try {
        util.handleAuth(context);
        const firestore = admin.firestore();

        const LicensePlate = util.checkString(data['LicensePlate']);
        const VehicleClass = data['VehicleClass'];
        const vehicleConditionAndClasses = data['vehicleConditionAndClasses'];

        const vehicleSnaps = await firestore.collection('vehicle').where('LicensePlate', '==', LicensePlate).get();
        const vehicleDocs = vehicleSnaps.docs;

        await vehicleDocs[0].ref.update({
            'VehicleClass': VehicleClass,
            'vehicleConditionAndClasses':vehicleConditionAndClasses
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