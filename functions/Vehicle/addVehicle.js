const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');

exports.handler = async (data, context) => {
    try {
        util.handleAuth(context);
        const firestore = admin.firestore();

        const insuranceNumber = util.checkString(data['insuranceNumber']);
        const LicensePlate = util.checkString(data['LicensePlate']);
        const makeAndModel = util.checkString(data['makeAndModel']);
        const registeredNumber = util.checkString(data['registeredNumber']);
        const registeredOwner = util.checkString(data['registeredOwner']);
        const ownerID = util.checkString(data['ownerID']);

        const vehicleSnaps = await firestore.collection('vehicle').where('LicensePlate', '==', LicensePlate).get();
        const vehicleDocs = vehicleSnaps.docs;

        const vehicleSnapsRegNo = await firestore.collection('vehicle').where('registeredNumber', '==', registeredNumber).get();
        const vehicleDocsRegNo = vehicleSnapsRegNo.docs;

        if (vehicleDocs.length !== 0) {
            return ({
                'status': 'error',
                'message': 'License Plate Number is Already Registered'
            });
        } else if (vehicleDocsRegNo.length !== 0) {
            return ({
                'status': 'error',
                'message': 'Registration number is Already Used'
            });
        } else {
            const ID = util.makeID(3);

            const vehicleRef = firestore.collection(DBUtil.VEHICLE).doc(ID);
            await vehicleRef.set({
                insuranceNumber,
                LicensePlate,
                'VehicleClass':null,
                makeAndModel,
                registeredNumber,
                registeredOwner,
                ownerID,
                'vehicleConditionAndClasses':null
            });
            console.log('done');

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