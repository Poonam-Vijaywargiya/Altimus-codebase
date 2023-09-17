import React from 'react'
import './Footer.css';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <div className='footer-container'>
        <Typography variant="body2" color="text.secondary">
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
            altimus.energy
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
  </div>
  )
}

export default Footer