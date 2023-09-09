import React from 'react'
import {Header } from '../../Components/index';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ContactIcon from '@mui/icons-material/ContactMail';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import './Contact.css';
const Contact = () => {
  return (
    <div className='contact-container'>
    <Header/>
    <div className='contact-card'>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
              If you need assistance, please feel free to contact us.
      </Typography>
      <Grid >
        <Grid item xs={12} sm={6}>
          <div className="contact-info">
            <PhoneIcon className="contact-icon" color="primary" />
            <Typography variant="body1">
              <strong>Phone:</strong> +1 (123) 456-7890
            </Typography>
          </div>
          <div className="contact-info">
            <EmailIcon className="contact-icon" color="primary" />
            <Typography variant="body1">
              <strong>Email:</strong> admin@altimus.in
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
 
    </div>
  )
}

export default Contact
