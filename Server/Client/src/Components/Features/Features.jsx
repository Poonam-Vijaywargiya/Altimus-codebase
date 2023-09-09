import React from 'react'
import {Header,Charts,Cards } from '..';
import './Features.css';
import featuresData from './FeaturesData.js';
import Typography from '@mui/material/Typography';
const Features = () => {
  return (
    <>
      <Header/>
      <div className='features-container'>
        <div className='features-card-container'>
        <Typography gutterBottom variant="h4" component="div">
          Altimus.AI – Features and Capabilities
        </Typography>
        {featuresData.map(v => (
            <div className='features-card'>
              <Cards title={v.title} content={v.content} img={v.img}/>
              {/* <Typography gutterBottom variant="h5" component="div" style={{padding: '20px', display: 'flex', justifyContent:'center'}}>
                      {v.title}
                    </Typography>
                    <div style={{padding: '20px', display: 'flex', justifyContent:'center', alignItems: 'center' }}>
                      <img src={v.img} style={{width: '80px', height: '80px'}} />
                    <Typography sx={{ mb: 1.5 }} style={{padding: '20px' }}>
                      {v.content}
                    </Typography>
                    </div> */}
                    
                    </div>
                    ))}
        <p>By utilizing ALTIMUS.AI, you can take full control of your renewable energy projects and make informed decisions to achieve maximum efficiency, profitability, and sustainability.	</p>
        </div>
        <Charts/>
      </div>
    </>
  )
}

export default Features