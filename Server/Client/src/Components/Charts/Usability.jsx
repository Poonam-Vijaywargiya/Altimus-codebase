import React from 'react'
import { LineChart, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import usabilityData from './UsabilityData';
import Typography from '@mui/material/Typography';
import './Charts.css';
 const Usability = () => {
  return (
    <div className='chart-style'>
      <Typography align="center" gutterBottom variant="h6" component="div" gutterTop>
       Battery Usable Capacity(MWh)
      </Typography>
      <ResponsiveContainer width='90%' height={250} >
         <LineChart data={usabilityData} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis type="number" domain={[290, 390]} />
          <Tooltip />
          <Line type="monotone" dataKey="usable_capacity" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Usability