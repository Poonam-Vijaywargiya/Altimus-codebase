import React, {useState, useEffect} from 'react'
import {Header } from '../../Components';
import './Optimize.css';
import CountUp from 'react-countup';
import OCapex from '../../assets/OCapex.svg';
import Battery from '../../assets/Battery.svg';
import Generation from '../../assets/Generation.svg';
import BatteryPlant from '../../assets/Battery-Plant.svg';
import SolarPlant from '../../assets/Solar-Plant.svg';

const Optimize = () => {
 useEffect(() => {
 },[])
  return (
    <div> 
      <Header/>
      <div className='optimize-container'>
        <div className='icon'>
          <div className='icon-container'>
            <img src={SolarPlant} className='top-icons' />
            <img src={BatteryPlant} className='top-icons' />
          </div>
          <div>
            100 MWac Solar Plant + 50 MWHr Battery plant = Cost $75 Million
          </div>
        </div>
        <div className='opt-container'>
        <div className='icons-style'>
          <img src={OCapex} className='opt-icons' />
          <div style={{padding: '20px'}}>
          1% increase in generation creates value  $<CountUp end={2000000} duration={8} useEasing={true} start={1999900} />
          </div>
        </div>

        <div className='icons-style'>
          <img src={Generation} className='opt-icons' />
          <div style={{padding: '20px'}}>
          1% lower capex creates value $<CountUp end={1500000} duration={8} useEasing={true} start={1499900}/> 
          </div>
        </div>
  
        <div className='icons-style'>
          <img src={Battery} className='opt-icons' />
          <div style={{padding: '20px'}}>
          1-year extended battery life creates value $<CountUp end={500000} duration={8} useEasing={true} start={499900} />
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Optimize