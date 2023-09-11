
import React from 'react'
import { LineChart, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import bessPriceData from './BESSPriceData';
import Typography from '@mui/material/Typography';
import './Charts.css';
 const BESSPrice = () => {
  return (
    <div className='chart-style'>
      <Typography align="center" gutterBottom variant="h6" component="div" gutterTop>
       BESS Forcast Price (Battery and PCS Only)
      </Typography>
      <ResponsiveContainer width='90%' height={250} >
         <LineChart data={bessPriceData} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis type="number" domain={[100, 300]} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8"  dot={{ stroke: '#8884d8', strokeWidth: 4, r: 4,strokeDasharray:''}}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BESSPrice