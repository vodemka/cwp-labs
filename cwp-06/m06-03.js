const sendmail = require("sendmail")({ silent: true });

module.exports = (fromEmail, toEmail, message) => {
    sendmail({
        from: fromEmail,
        to: toEmail,
        subject: 'Laboratory work 06 - SendMail',
        html: "<h2>" + message + "</h2>"
    }, function (err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    })
}