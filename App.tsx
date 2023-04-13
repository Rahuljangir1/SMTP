import { useState } from "react";
import nodemailer from 'nodemailer';
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')


  // Generating Password 
  const generatePassword = () => {
    const length = 6;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      newPassword += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(newPassword);
  }

  
    // Generating OTP 
  const[otp, setOtp] = useState('')
  const generateOtp = () => {
    const length = 4;
    const charset = "0123456789";
    let newOtp = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      newOtp += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(newOtp);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/register', {
        name: name,
        email: email,
        password: `${password}`
      });

      console.log(response.data);
      // redirect to the login page or other page
    } catch (error) {
      console.error(error);
    }
  };
 


  
  // sending email
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'your-email@gmail.com', //Engenius credentials
      pass: 'your-email-password' 
    }
  });
  const mailOptions = {
    from: 'your-email@gmail.com', //engenius eamil
    to: `${email}`, //user email
    subject: 'Test Email',
    text: `Welcome to Engenius Your new password is: ${password}`
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return (
    <>
    <button onClick={generatePassword}>click me to generate password</button>
    <p>{password}</p>
    <br />
    <button onClick={generateOtp}>click me to generate otp</button>
    <p>{otp}</p>
      {/* <p>{JSON.stringify(form)}</p> */}
      <form onSubmit={handleSubmit}>
      <label>
        name:
        <input type="password" value={name} onChange={(event) => setName(event.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </label>
      <br />
    
      <button type="submit">Register</button>
    </form>
    </>
  );
}

export default App;
