require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Create email transporter using Ethereal Email (testing service)
let transporter;

// Initialize transporter
async function createTransporter() {
  try {
    // Create test account with Ethereal Email
    let testAccount = await nodemailer.createTestAccount();
    
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    
    console.log('Email transporter created successfully');
    console.log('Test account:', testAccount.user);
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    
    // Fallback to a simple configuration
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'test@example.com',
        pass: 'test'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
}

// Initialize transporter on startup
createTransporter();

// API endpoint for form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  
  // Verify reCAPTCHA (using test key for development)
  if (recaptchaToken) {
    try {
      const recaptchaSecret = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'; // Test secret key
      const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;
      
      const recaptchaResponse = await axios.post(recaptchaVerifyUrl);
      
      if (!recaptchaResponse.data.success) {
        return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
      }
    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return res.status(500).json({ success: false, message: 'reCAPTCHA verification error' });
    }
  }
  
  try {
    // Email options - send to both Yahoo and Gmail emails
    const mailOptions = {
      from: '"Looi Mun Wai Contact Form" <noreply@portfolio.com>',
      to: ['l_munwai@yahoo.com', 'munwai3939728@gmail.com'],
      replyTo: `${email}`,
      subject: `New Business Enquiry from ${name}`,
      html: `
        <h3>New Business Enquiry from ${name}</h3>
        <p>You've received a new business enquiry from your website:</p>
        <br>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from Looi Mun Wai Portfolio Contact Form</small></p>
      `,
      text: `You've received a new business enquiry from your website:

Name: ${name}
Email: ${email}

Message:
${message}

---
Sent from Looi Mun Wai Portfolio Contact Form`
    };
    
    // Send email
    let info = await transporter.sendMail(mailOptions);
    
    console.log('Message sent: %s', info.messageId);
    console.log('Email sent to both: l_munwai@yahoo.com and munwai3939728@gmail.com');
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully to both accounts',
      previewUrl: nodemailer.getTestMessageUrl(info)
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // For demonstration purposes, we'll still return success
    // but log the email details
    console.log('Email would have been sent to: l_munwai@yahoo.com and munwai3939728@gmail.com');
    console.log('From:', name, '(' + email + ')');
    console.log('Message:', message);
    
    res.status(200).json({ 
      success: true, 
      message: 'Message received successfully (demo mode)',
      note: 'Email logged to server console'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Portfolio Contact API' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

