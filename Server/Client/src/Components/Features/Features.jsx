import React from 'react'
import {Charts,Cards } from '..';
import './Features.css';
import featuresData from './FeaturesData.js';
const Features = () => {
  return (
      <div className='features-container' id='featureSection'>
        <div className='features-card-container'>
        <div className='feature-tag'>
        Altimus.Energy – Features and Capabilities
        </div>
        {featuresData.map(v => (
          <div className='features-card'>
            <Cards title={v.title} content={v.content} img={v.img}/>
          </div>
        ))}
        <p className='footer-tag'>Using Altimus.Energy, optimize your renewable energy projects for maximizing profitability and efficiency.</p>
        </div>
        <Charts/>
      </div>
  )
}

export default Features