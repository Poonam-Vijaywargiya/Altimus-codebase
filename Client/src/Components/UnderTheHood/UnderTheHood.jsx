import React from 'react'
import {Cards, Header} from '../../Components';
import underTheHoodData from './UnderTheHoodData.js';
import './UnderTheHood.css';
import Typography from '@mui/material/Typography';
import energyVideo from '../../assets/Energy-Video.mp4';
const UnderTheHood = () => {
  return (
    <>
        <Header/>
        <div className='hood-container'>
        <video className='video-under-hood-tag' autoPlay loop muted>
          <source src={energyVideo} type='video/mp4' />
        </video>
           <div className='hood-cards-container'> {underTheHoodData.map(v => (
                <div className='hood-card'>
                    <Typography gutterBottom variant="h5" component="div" style={{padding: '20px', display: 'flex', justifyContent:'center'}}>
                      {v.title}
                    </Typography>
                    <div style={{padding: '20px', display: 'flex', justifyContent:'center', alignItems: 'center' }}>
                      <img src={v.img} style={{width: '80px', height: '80px'}} />
                    <Typography sx={{ mb: 1.5 }} style={{padding: '20px' }}>
                      {v.content}
                    </Typography></div>
                  </div>))}
                </div> 
        </div>
    </>
  )
}

export default UnderTheHood