const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');

exports.handler = async (request, response) => {
    try {
        // util.handleAuth(context);
        const firestore = admin.firestore();

        const address = util.checkString(request.body['address']);
        const employee_id = util.checkString(request.body['employee_id']);
        const first_name = util.checkString(request.body['first_name']);
        const last_name = util.checkString(request.body['last_name']);
        const mail_id = util.checkemail(request.body['mail_id']);
        const phone_number = util.checkString(request.body['phone_number']);
        const station_id = util.checkString(request.body['station_id']);
        const password = util.checkString(request.body['password']);

        const policeMenSnaps = await firestore.collection('PoliceMen').where('mail_id', '==', mail_id).get();
        const policeMenDocs = policeMenSnaps.docs;

        const policeMenSnapsEmpID = await firestore.collection('PoliceMen').where('employee_id', '==', employee_id).get();
        const policeMenDocsEmpID = policeMenSnapsEmpID.docs;

        if (policeMenDocs.length !== 0) {
            response.send({
                'status': 'error',
                'message': 'Email is Already Used'
            });
        } else if (policeMenDocsEmpID.length !== 0) {
            response.send({
                'status': 'error',
                'message': 'EmployeeID is Already Used'
            });
        } else {
            const policeMenRef = firestore.collection(DBUtil.POLICEMEN).doc();
            await policeMenRef.set({
                address,
                employee_id,
                first_name,
                last_name,
                mail_id,
                phone_number,
                station_id
            });
            console.log('done')

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