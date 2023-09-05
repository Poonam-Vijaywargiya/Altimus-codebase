import React from 'react'
import './Charts.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {FreeCashFlow,MonthlyGeneration } from '../../Components/index';
import ChargingStationOutlinedIcon from '@mui/icons-material/ChargingStationOutlined';
import SolarPowerOutlinedIcon from '@mui/icons-material/SolarPowerOutlined';
import WindPowerOutlinedIcon from '@mui/icons-material/WindPowerOutlined';
const Charts = () => {
  return (
    <div className='chart-container'>
        <Typography align="center" gutterBottom variant="h4" component="div">
        Optimized Solution
      </Typography>
        <div className='kpi-container'>
        <Card sx={{ width: 150 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Wind (MW)
                </Typography>
                <Typography variant="h5" component="div">
                <WindPowerOutlinedIcon color="primary" />
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                100 MW
                </Typography>
            </CardContent>
        </Card>
        <Card sx={{ width: 150 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Solar (MWac)
                </Typography>
                <Typography variant="h5" component="div">
                <SolarPowerOutlinedIcon color="primary" />
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                130 MWac
                </Typography>
            </CardContent>
        </Card>
        <Card sx={{ width: 150 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Battery (MWHr)
                </Typography>
                <Typography variant="h5" component="div">
                <ChargingStationOutlinedIcon color="primary" />
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                78 MWHr
                </Typography>
            </CardContent>
        </Card>
        </div>
        <FreeCashFlow/>
    <MonthlyGeneration/>
    </div>
  )
}

export default Charts