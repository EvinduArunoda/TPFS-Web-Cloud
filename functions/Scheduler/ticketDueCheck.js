const admin = require('firebase-admin');
const moment = require('moment');
const emailHandler = require('../Email/send_email');

exports.handler = async (context) => {
    const firestore = admin.firestore();
    const currentTime = admin.firestore.Timestamp.now();

    const twoWeeksBefore = admin.firestore.Timestamp.fromDate(moment(currentTime.toDate()).subtract(2,'weeks').toDate());

    const missedTickets = await firestore.collection('Ticket').where('Status','==','open').where('Time','<',twoWeeksBefore).get();
    const missedTicketDocs = missedTickets.docs;

    for (const Ticket of missedTicketDocs) {

        await Ticket.ref.update({
            'Status': 'due'
        });

        const driverLicense = Ticket.data().LicenseNumber;
        const driverSnap = await firestore.collection('Drivers').where('LicenseNumber','==',driverLicense).get();
        const driverDocs = driverSnap.docs;
        if (driverDocs.length !== 0) {
            const msg = {
                to: driverDocs[0].data().emailaddress,
                from: 'tpfsuom@gmail.com',
                subject: 'Ticket Expired Alert',
                text: 'You have not paid your ticket on time. You will be directed to the court and details will be sent.',
                html: `<strong>You have not paid your ticket on time. You will be directed to the court and details will be sent.</strong>`,
            };
            await emailHandler.sendEmail(msg);
        }
    }

}