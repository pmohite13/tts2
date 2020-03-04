const sgMail = require('@sendgrid/mail');


function sendEmail(to, subject, html) {

    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.setApiKey('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');
    const msg = {
        to: to,
        from: { email: 'info@webridge.online', name: 'Webridge Info' },
        // fromname: 'Webridge Info',
        subject: subject,
        // text: 'Please check, new project added by organization',
        html: html,
    };
    console.log(msg);
    sgMail.send(msg)
        .then(success => {
            console.log('email send successfully');
        })
        .catch(error => {
            console.log('error while sending email: ', error);
        });
}




module.exports = sendEmail;