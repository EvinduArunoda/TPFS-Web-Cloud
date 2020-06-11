const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');
const emailHandler = require('../Email/send_email');

exports.handler = async (data, context) => {
    try {
        // util.handleAuth(context);
        const firestore = admin.firestore();

        const email = util.checkemail(data['email']);
        const password = util.checkString(data['password']);
        const code = util.checkString(data['code']);

        const userSnaps = await firestore.collection('WebUsers').where('email', '==', email).get();
        const userDocs = userSnaps.docs;

        if (userDocs.length === 0) {
            return ({
                'status': 'error',
                'message': 'No User Under This Email Address'
            });
        } else {
            const codeSnaps = await firestore.collection('ResetPasswordCodes').where('email', '==', email).get();
            const codeDocs = codeSnaps.docs;

            if (codeDocs.length !== 0) {
                const codeData = codeDocs[0].data();
                const resetCode = codeData.code;

                if (code === resetCode) {
                    const User = await admin.auth().getUserByEmail(email);
                    await admin.auth().updateUser(User.uid,{
                        password: password
                    });

                    await codeDocs[0].ref.delete();

                    return ({
                        'status': 'success'
                    });
                } else {
                    return ({
                        'status': 'error',
                        'message': 'Code you entered is wrong !'
                    });
                }
            } else {
                return ({
                    'status': 'error',
                    'message': 'Something went wrong. Try again!'
                });
            }
        }

    } catch (e) {
        return ({
            'status': 'error',
            'message': e.message
        });
    }
}