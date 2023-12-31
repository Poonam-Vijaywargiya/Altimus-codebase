import React from 'react';
import underTheHoodData from './UnderTheHoodData.js';
import './UnderTheHood.css';
import underthehoodp from '../../assets/underthehoodp.svg';
const UnderTheHood = () => {
  return (
    <>
        <div className='under-the-hood-tag' id="underHoodSection" >Under The Hood</div>
        <div className='hood-container'>
          <img src={underthehoodp} style={{ margin: '10px'}}/>
           <div className='hood-cards-container'> {underTheHoodData.map(v => (
                <div className='hood-card'>
                    <div style={{padding: '10px', display: 'flex', justifyContent:'center', fontSize: '24px'}}>
                      {v.title}
                    </div>
                    <div style={{padding: '10px', display: 'flex', justifyContent:'center', alignItems: 'center' }}>
                      <img src={v.img} style={{width: '80px', height: '80px'}} />
                    <div sx={{ mb: 1.5 }} style={{padding: '10px' }}>
                      {v.content}
                    </div></div>
                  </div>))}
                </div> 
        </div>
    </>
  )
}

export default UnderTheHood