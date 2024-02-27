import { SMTPClient  } from 'emailjs'
import 'dotenv/config'

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const EMAIL = process.env.EMAIL;
const sub = 'Stoic Quote'
let message;

const client = new SMTPClient({
	user: USER,
	password: PASSWORD,
	host: HOST,
	ssl: true,
});

async function getQuote(){
    const response = await fetch('https://stoic.tekloon.net/stoic-quote');
    const script = await response.json();
    return script;
}

async function quoteSender() {
    const {author, quote} = await getQuote();
    if (author.length === 0) {
        author = 'John Doe'
    }

    message = `${author} once time said: ${quote}`

     client.send(
        {
            text: message,
            from: 'your email',
            to: 'Someone email',
            cc: 'else <else@your-email.com>',
            subject: sub,
        },
        (err, message) => {
            console.log(err || message);
        }
    );

}

quoteSender()


