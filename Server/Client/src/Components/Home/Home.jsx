import React from 'react'
import './Home.css'
import {Header, Optimize, Features, UnderTheHood, Footer} from '../index';
import landing from '../../assets/landing.svg'
import Divider from '@mui/material/Divider';
const Home = () => {
  return (
    <>
      <Header />
      <div>
         <img src={landing} />
         <Divider variant="middle" />
         <Optimize />
         <Divider variant="middle"/>
         <Features/>
         <Divider variant="middle"/>
         <UnderTheHood/>
         <Divider variant="middle"/>
         <Footer/>
    </div>
    </>
  )
}

export default Home