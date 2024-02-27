//Importing Packages
import { SMTPClient  } from 'emailjs'
import 'dotenv/config'

//Here call env variables
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const EMAIL = process.env.EMAIL;

// message subjec
const sub = 'Stoic Quote'

//empty variable
let message;

//Creating a new SMTPClient
const client = new SMTPClient({
	user: USER,
	password: PASSWORD,
	host: HOST,
	ssl: true,
});

//Getting a quote
async function getQuote(){
    const response = await fetch('https://stoic.tekloon.net/stoic-quote');
    const script = await response.json();
    return script;
}

//Creating a message and sendind it
async function quoteSender() {
    const {author, quote} = await getQuote();
    if (author.length === 0) {
        author = 'John Doe'
    }

    message = `${author} once time said: ${quote}`

    //message sender
     client.send(
        {
            //message extructure
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


