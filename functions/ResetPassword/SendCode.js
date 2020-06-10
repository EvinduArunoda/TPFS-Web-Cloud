const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');
const emailHandler = require('../Email/send_email');

exports.handler = async (data, context) => {
    try {
        // util.handleAuth(context);
        const firestore = admin.firestore();

        const email = util.checkemail(data['email']);

        const userSnaps = await firestore.collection('WebUsers').where('email', '==', email).get();
        const userDocs = userSnaps.docs;


        if (userDocs.length === 0) {
            return ({
                'status': 'error',
                'message': 'No User Under This Email Address'
            });
        } else {
            const code = Math.floor(100000 + Math.random() * 900000);

            const codeSnaps = await firestore.collection('ResetPasswordCodes').where('email', '==', email).get();
            const codeDocs = codeSnaps.docs;

            for (const document of codeDocs) {
                await document.ref.delete();
            }

            const codeRef = firestore.collection(DBUtil.CODES).doc();
            await codeRef.set({
                email,
                'code':code.toString()
            });

            const msg = {
                to: email,
                from: 'tpfs@email.com',
                subject: 'Reset Password',
                text: 'Reset password account verification code : ' + code.toString(),
                html: `<strong>Reset password account verification code : ${code.toString()}</strong>`,
            };
            await emailHandler.sendEmail(msg);

            return ({
                'status': 'success'
            });
        }

    } catch (e) {
        return ({
            'status': 'error',
            'message': e.message
        });
    }
}