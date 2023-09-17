import React, {useState, useEffect} from 'react';
import './Optimize.css';
import OCapex from '../../assets/OCapex.svg';
import Battery from '../../assets/Battery.svg';
import Generation from '../../assets/Generation.svg';
import optimze from '../../assets/whyoptimize.jpg'
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
    <>
    {/* <div className='optimize-tag'>Why Optimize?</div> */}
    <div id="optimizeSection"> 
      <div className='optimize-container'>
         <><div className='icon-container'>
            <img src={optimze} className='top-icons' />
          </div>
          <div className='optimize-text'>
          A hybrid power plant with a solar capacity of 100 MWac and battery capacity of 50 MWh with a Total Project Cost of US$75 million , incremental improvements can have an outsize impact. 
          </div></> 
        <div className='opt-container'>
        <div className='icons-style'>
          <img src={Generation} className='opt-icons' />
          <div style={{padding: '20px',fontSize: '18px'}}>
          1% increase in generation creates value 
          {countG == 2000000 ? <span style={{fontWeight: 'bold', color: '#05498f',fontSize: '20px'}}> USD 2,000,000</span> : <span> USD {countG}</span>}
          </div>
        </div>

        <div className='icons-style'>
          <img src={OCapex} className='opt-icons' />
          <div style={{padding: '20px',  fontSize: '18px'}}>
          1% lower capex creates value 
          {countC == 1500000 ? <span style={{fontWeight: 'bold', color: '#05498f',fontSize: '20px'}}> USD 1,500,000</span> : <span> USD {countC}</span>}
          </div>
        </div>
  
        <div className='icons-style'>
          <img src={Battery} className='opt-icons' />
          <div style={{padding: '20px',fontSize: '18px'}}>
          1-year extended battery life creates value 
          {countB == 500000 ? <span style={{fontWeight: 'bold', color: '#05498f', fontSize: '20px'}}> USD 50,000</span> : <span> USD {countB}</span>}
          </div>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Optimize