import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import flowData from './FreeCashFlowData';
import Typography from '@mui/material/Typography';
import './Charts.css';
 const FreeCashFlow = () => {
  return (
    <div className='chart-style'>
      <Typography align="center" gutterBottom variant="h6" component="div" gutterTop>
       Free Cash Flow(in US$ million)
      </Typography>
      <ResponsiveContainer width='90%' height={250} >
         <BarChart data={flowData} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" stackId="a" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default FreeCashFlow