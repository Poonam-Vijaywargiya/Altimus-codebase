import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Cards.css'
const Cards = ({title, content, img}) => {
  return (
    <Card>
    <CardContent className="changeColor">
      <Typography gutterBottom variant="h5" component="div">
      {title}
      </Typography>
      {/* <img src={img} style={{width: '80px', height: '80px'}} />
      <Typography sx={{ mb: 1.5 }}>
     {content}
     </Typography> */}
     <div style={{padding: '20px', display: 'flex', alignItems: 'center' }}>
        <img src={img} style={{width: '60px', height: '60px'}} />
        <Typography sx={{ mb: 1.5 }} style={{padding: '20px' }}>
          {content}
        </Typography>
    </div>
    </CardContent>
  </Card>
  )
}

export default Cards