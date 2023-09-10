import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from './MonthlyGenerationData';
import Typography from '@mui/material/Typography';
import './Charts.css';
 const MonthlyGeneration = () => {
  return (
    <div className='chart-style'> 
    <Typography align="center" gutterBottom variant="h6" component="div" gutterTop>
       Monthly Generation(MWH)
      </Typography>
      <ResponsiveContainer width='90%'  height={250} >
         <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="months" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="peak" stackId="a" fill="#8884d8" />
          <Bar dataKey="off-peak" stackId="a" fill="#969696" />
          <Bar dataKey="surplus-energy" stackId="a" fill="#605adb" />
        </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default MonthlyGeneration