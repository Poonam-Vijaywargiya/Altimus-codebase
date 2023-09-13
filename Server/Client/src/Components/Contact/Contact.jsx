import React from 'react'
import {Header } from '../index';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import EmailIcon from '@mui/icons-material/Email';
import contactus from '../../assets/contactus.jpg'
import './Contact.css';
const Contact = () => {
  return (
    <div className='contact-container'>
    <Header/>
    <div style={{display:'flex', alignItems: 'center'}}>
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
            <EmailIcon className="contact-icon" color="primary" />
            <Typography variant="body1">
              <strong>Email:</strong> 
              <a href="mailto:admin@altimus.energy" style={{textDecoration: 'none'}}> admin@altimus.energy</a>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
    <div style={{flex: 2  }}>
      <img src={contactus} style={{height: '50%', width: '90%'}}/>
    </div>
    </div>
   
 
    </div>
  )
}

export default Contact
