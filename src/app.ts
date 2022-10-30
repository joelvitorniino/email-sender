import { config } from 'dotenv';
import nodemailer, { Transporter } from 'nodemailer';

config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 0,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sender = {
    name: 'Usuario Joel',
    email: 'sender@teste.com'
};

const receiver = {
    email: 'bor@example.com'
};

const mailContent = {
    subject: 'Hello, World!',
    text: "It's work!",
    html: "<strong>It's work</strong>"
}

const sendMail = async (transporter: Transporter, sender: any, receiver: any | string[], mailContent: any) => {
    const mail = await transporter.sendMail({
        from: `"${sender.name}" ${sender.email}`,
        to: receiver.email,
        subject: mailContent.subject,
        text: mailContent.text,
        html: mailContent.html  
    });

    console.log(`Email sended: ${mail.messageId}`);
    console.log(`URL of Ethereal: ${nodemailer.getTestMessageUrl(mail)}`);
};

const mail = async () => {
    try {
        await sendMail(transporter, sender, receiver, mailContent);
    } catch(e) {
        console.log(e);
    }
};

mail();