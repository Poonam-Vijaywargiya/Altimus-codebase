import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const ProjectCard = ({title, content, id, projectPreview, downloadOutput}) => {
  return (
    <Card>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
      {title}
      </Typography>
      <Typography sx={{ mb: 1.5 }}>
     {content}
     </Typography>
     <Button onClick ={() => downloadOutput(id)}>Download Output</Button>
     <Button onClick ={() => projectPreview(id)}>Show Preview</Button>
    </CardContent>
  </Card>
  )
}

export default ProjectCard