import { config } from 'dotenv';
import nodemailer, { Transporter } from 'nodemailer';

config();

interface Sender {
    name: string;
};

interface Receiver {
    email: string | string[];
};

interface MailContent {
    subject: string;
    text: string;
    html: string;
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    secure: true,
});

const sender: Sender = {
    name: 'Test',
};

const receiver: Receiver = {
    email: 'joelprofessor12@gmail.com'
};

const mailContent: MailContent = {
    subject: 'Hello, Bro!',
    text: "Really?",
    html: "<strong>Really bro?</strong>"
}

const sendMail = async (transporter: Transporter, sender: Sender, receiver: Receiver, mailContent: MailContent) => {
    const mail = await transporter.sendMail({
        from: sender.name,
        to: receiver.email,
        subject: mailContent.subject,
        text: mailContent.text,
        html: mailContent.html  
    });

    console.log(`Email sended: ${mail.messageId}`);
};

const mail = async () => {
    try {
        await sendMail(transporter, sender, receiver, mailContent);
    } catch(e) {
        console.log(e);
    }
};

mail();