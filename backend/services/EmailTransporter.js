const brevo = require('@getbrevo/brevo');
require('dotenv').config();


const transporter = new brevo.BrevoClient({
    apiKey : process.env.BREVO_API_SECRET
})

module.exports  = transporter;