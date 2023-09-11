import React from 'react'
import {Cards, Header} from '..';
import underTheHoodData from './UnderTheHoodData.js';
import './UnderTheHood.css';
import Typography from '@mui/material/Typography';
import underthehood from '../../assets/underthehood.jpg';
const UnderTheHood = () => {
  return (
    <>
        <Header/>
        <div className='under-the-hood-tag'>Under The Hood</div>
        <div className='hood-container'>
         <div className='img-under-hood-cotainer '><img src={underthehood} className='img-under-hood-tag' /></div>
           <div className='hood-cards-container'> {underTheHoodData.map(v => (
                <div className='hood-card'>
                    <Typography variant="h5" component="div" style={{padding: '10px', display: 'flex', justifyContent:'center'}}>
                      {v.title}
                    </Typography>
                    <div style={{padding: '10px', display: 'flex', justifyContent:'center', alignItems: 'center' }}>
                      <img src={v.img} style={{width: '80px', height: '80px'}} />
                    <Typography sx={{ mb: 1.5 }} style={{padding: '10px' }}>
                      {v.content}
                    </Typography></div>
                  </div>))}
                </div> 
        </div>
    </>
  )
}

export default UnderTheHood