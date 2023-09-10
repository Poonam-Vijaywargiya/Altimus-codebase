import React from 'react'
import energyVideo from '../../assets/Energy-Video.mp4';
import './Home.css'
import {Header} from '../index'
const Home = () => {
  return (
    <>
       <Header/>
    <div>
        <video className='videoTag' autoPlay loop muted>
          <source src={energyVideo} type='video/mp4' />
        </video>
       <div className='content'>
          <div>
          ALTIMUS serves as a sophisticated tool for the optimization and configuration of power plants, whether solar, wind, battery, or a hybrid of these. 
          Leveraging GRG Non-Linear Optimization, our state-of-the-art Non-Greedy Battery Charging Algorithm, and precise Monte Carlo simulations. 
          We are committed to maximizing your returns and enhancing efficiency.
          </div>
      </div>
    </div>
    </>
  )
}

export default Home