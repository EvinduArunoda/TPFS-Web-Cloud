const admin = require('firebase-admin');
const util = require('../util/util');
const DBUtil = require('../util/db_util');
const emailHandler = require('../Email/send_email');

exports.handler = async (data, context) => {
    try {
        util.handleAuth(context);
        const firestore = admin.firestore();

        const TktId = util.checkString(data['id']);
        const receiptNo = util.checkString(data['receiptNo']);

        const payments = await firestore.collection('Payment').where('receiptNo', '==', receiptNo).get();
        const paymentDocs = payments.docs;
        if (paymentDocs.length === 0) {

            const Ticket = firestore.collection(DBUtil.TICKET).doc(TktId);
            const TicketSnap = await Ticket.get();
            const amount = TicketSnap.data().FineAmount;
            const driverLis = TicketSnap.data().LicenseNumber;
            const Time = admin.firestore.Timestamp.now();
            const driver = await firestore.collection(DBUtil.DRIVER).where('LicenseNumber', '==', driverLis).get();
            const driverSnap = driver.docs[0];

            await Ticket.update({
                Status: 'closed',
                ClosedTime: Time
            });

            const payment = firestore.collection(DBUtil.PAYMENT).doc();
            await payment.set({
                ticket: Ticket,
                driver: driverSnap.ref,
                timeStamp: Time,
                amount,
                status: 'manual',
                receiptNo
            });

            const msg = {
                to: driverSnap.data().emailaddress,
                from: 'tpfsuom@gmail.com',
                subject: 'Closing ticket alert',
                text: 'Your ticket has been closed',
                html: `<strong>Your ticket has been closed.</strong>`,
            };
            await emailHandler.sendEmail(msg);

            return ({
                'status': 'success'
            });
        } else {
            return ({
                'status': 'error',
                'message': 'Receipt Number is Previously Used'
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