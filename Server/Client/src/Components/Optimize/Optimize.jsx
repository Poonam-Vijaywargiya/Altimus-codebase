import React, {useState, useEffect} from 'react'
import {Header } from '..';
import './Optimize.css';
import CountUp from 'react-countup';
import OCapex from '../../assets/OCapex.svg';
import Battery from '../../assets/Battery.svg';
import Generation from '../../assets/Generation.svg';
import BatteryPlant from '../../assets/Battery-Plant.svg';
import SolarPlant from '../../assets/Solar-Plant.svg';
const Optimize = () => {
const [countG, setCountG] = useState(1999550);
const [countC, setCountC] = useState(1499550);
const [countB, setCountB] = useState(499550);

 useEffect(() => {
    if(countG != 2000000) {
      setCountG(prev => prev+1)
    } 
 },[countG]);

 useEffect(() => {
  if(countC != 1500000) {
    setCountC(prev => prev+1)
  } 
},[countC]);

useEffect(() => {
  if(countB != 500000) {
    setCountB(prev => prev+1)
  } 
},[countB]);
  return (
    <div> 
      <Header/>
      <div className='optimize-tag'>Why Optimize?</div>
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
        {/* <video className='video-optimize-tag' autoPlay muted>
          <source src={energyVideo} type='video/mp4' />
        </video> */}
        <div className='opt-container'>
        <div className='icons-style'>
          <img src={Generation} className='opt-icons' />
          <div style={{padding: '20px'}}>
          1% increase in generation creates value 
          {countG == 2000000 ? <span style={{fontWeight: 'bold', color: '#05498f',fontSize: '28px'}}> USD 2,000,000</span> : <span> USD {countG}</span>}
          {/* <CountUp end={2000000} duration={8} useEasing={true} start={0} /> */}
          </div>
        </div>

        <div className='icons-style'>
          <img src={OCapex} className='opt-icons' />
          <div style={{padding: '20px'}}>
          1% lower capex creates value 
          {countC == 1500000 ? <span style={{fontWeight: 'bold', color: '#05498f',fontSize: '28px'}}> USD 1,500,000</span> : <span> USD {countC}</span>}
          {/* <CountUp end={1500000} duration={8} useEasing={true} start={0}/>  */}
          </div>
        </div>
  
        <div className='icons-style'>
          <img src={Battery} className='opt-icons' />
          <div style={{padding: '20px'}}>
          1-year extended battery life creates value 
          {countB == 500000 ? <span style={{fontWeight: 'bold', color: '#05498f', fontSize: '28px'}}> USD 50,000</span> : <span> USD {countB}</span>}
          {/* <CountUp end={500000} duration={8} useEasing={true} start={0} /> */}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Optimize