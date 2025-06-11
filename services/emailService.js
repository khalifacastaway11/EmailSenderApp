const transporter = require('../config/smtpConfig');

exports.sendEmail = async (to, subject, htmlContent, attachement = []) => {
    try {
        let info = await transporter.sendMail({
          from: `"Your app" <${process.env.SMTP_USER}>`,
          to:
          subject,
          html: htmlContent,
          attachments,
        });
        console.log('Email sent: %s', info.messageId);
    }
    catch (error) {
        console.error('Error sending email: ', error);
        
    }
};
    


