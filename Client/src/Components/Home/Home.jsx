import React from 'react'
import energyVideo from '../../assets/Energy-Video.mp4';
import './Home.css'
import {Header} from '../../Components/index'
const Home = () => {
  return (
    <>
       <Header/>
    <div>
        <video className='videoTag' autoPlay loop muted>
          <source src={energyVideo} type='video/mp4' />
        </video>
       <div className='content'>
          <h2>
            Renewable Energy, Supercharged by AI 
          </h2>
          <h5>
            ALTIMUS serves as a sophisticated tool for the optimization and configuration of power plants, whether solar, wind, battery, or a hybrid of these. 
          </h5>
          <h5>
            Leveraging GRG Non-Linear Optimization, our state-of-the-art Non-Greedy Battery Charging Algorithm, and precise Monte Carlo simulations.
          </h5>
          <h5>
            We are committed to maximizing your returns and enhancing efficiency.
          </h5>
      </div>
    </div>
    </>
  )
}

export default Home