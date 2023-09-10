import React , {useState, useEffect} from 'react'
import {Header,Charts, Steps, ProjectCard, CreateNewProject} from '../index';
import "./Projects.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Projects = () => {
  const navigate = useNavigate();
  const [showNewProject, setShowNewProject] = useState(false)
  const [projects, setProjects] = useState([]);
  const [projectPreviewModal, setShowProjectPreviewModal] = useState(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const projectsList = [{
    projectId: 1,
    projectName: 'Project One',
    projectDescShort: 'Short description ',
    projectDesc : 'some description about project',
    formData: [{
      label: 'General',
      data: {
        field: "",
        value: "",
        label: ""
      }
    },{
      label: 'Solar',
      data: {
        field: "",
        value: "",
        label: ""
      }
    }]
  },{
    projectId: 2,
    projectName: 'Project Two',
    projectDescShort: 'Short description ',
    projectDesc : 'some description about project',
    formData: [{
      label: 'General',
      data: {
        field: "",
        value: "",
        label: ""
      }
    },{
      label: 'Solar',
      data: {
        field: "",
        value: "",
        label: ""
      }
    }]
  }]
  const showProjectPreview = async (id ) => {
    
    const res = await fetch('/api/getprojectById', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            id: id
          })
    });
    const resData = await res.json();
    setData(resData.data.data);
    setOpen(true);
    setShowProjectPreviewModal(true);
  }
  const getProjects = async () => {
    const res = await fetch('/api/projects', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            email: localStorage.getItem('email'),
          })
    });
    const resData = await res.json();
    setProjects(resData.data)
  }
  useEffect(() =>{
    if(localStorage.getItem('email')) {
      getProjects();
    } else {
      navigate('/login');
    }
    // getProjects();
  }, [])

  const createNewProject =() =>{
      setShowNewProject(true)
  }
  const downloadOutput = async (id) => {
    const response = await axios.get(`/api/downloadOutput/${id}`, {
      responseType: 'blob',
    });
    if(response.status == 200) {
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Output.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } else if(response.status == 404) {
      alert('Output is getting generated, please wait!')
    } else {
      alert('Some error ocurred, we will be back soon.')
    }
  } 
  return (
    <div>
    <Header/>
   <div style={{top: '10vh', position: 'relative'}} >
   { !showNewProject && <><div className='btn-class'>
      <div style={{border: '1px solid lightgray', borderRadius: '10px', padding: '20px'}} >
        <h2>How does the model work?</h2>									
        <div>The model aims to provide the project developer with optimized capacity of Solar, Wind and BESS sizing for the given input data</div>									
        <div > <h3>Output: </h3>                        
          <ul style={{marginLeft: '20px'}}>
            <li> Solar, Wind and BESS initial installed capacity. Optimized Battery augmentation approach (capacity and year)</li>
            <li> Suggested BESS co-location option ( with Wind or Solar)</li>								
            <li>Compliance met as per the input requirement</li>								
            <li>FCFF and FCFE of the project over the project timeline</li>												
            <li>DSCR over the 25 year period</li>												
            <li> Penalties for non-compliance</li>												
            <li> Expected EIRR</li>												
          </ul>
          </div>  
          <div> <h3>Input: </h3>                            
            <ul style={{marginLeft: '20px'}}>
              <li>Project Configuration: Solar plus Wind, Solar plus Storage, Wind plus Storage, Solar plus Wind Plus Storage										
              </li><li>15 min or hourly Solar, Wind profile data										
              </li><li>Capex and Opex of Solar,Wind and BESS </li>
            </ul>
          </div>									
      </div>
      <Button onClick={createNewProject} variant="contained" sx={{ mt: 3, mb: 2,maxHeight: '40px' }} > Create New Project </Button>
    </div>
            <div className='project-container'>
              { projects.length> 0 && projects.map(v =>(
                  <div className='project-card'> 
                    <ProjectCard title={v.data.projectName} content={v.data.projectShortDesc} 
                  id={v._id} projectPreview={showProjectPreview} downloadOutput={downloadOutput}
                  />
                  </div>
              ))}
    </div></>}
    {
      showNewProject && <CreateNewProject/>
    }

   { setShowProjectPreviewModal && data && <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
      >
        <DialogTitle>{"Project Preview of Project: "} {data.projectName}</DialogTitle>
        <DialogContent>
        <div style={{display:'flex', flexDirection:'column'}}>
        <div style={{ display:'flex', flexDirection:'column', marginTop: '10px',marginBottom: '10px', borderRadius: '20px', border: '1px solid gray', padding: '15px'}}>
        <div style={{marginTop: '20px',marginBottom: '20px'}}>Project Details</div>   
        <TextField variant="standard" value={"Project Name: "+data.projectName} InputProps={{readOnly: true}} />
        <TextField variant="standard"  value={"Project Short Description: "+data.projectShortDesc} InputProps={{readOnly: true}} />
        <TextField variant="standard" value={"Project Description: " + data.projectDesc} InputProps={{readOnly: true}} />
        <TextField variant="standard" value={"Project File: "+data.file} InputProps={{readOnly: true}} />
          </div>
          {data && data.formData && data.formData.map(step => (
           <div style={{ display:'flex', flexDirection:'column', marginTop: '10px',marginBottom: '10px', borderRadius: '20px', border: '1px solid gray', padding: '15px'}}>
                <div style={{marginTop: '20px',marginBottom: '20px'}}>{step.stepLabel}</div>
            <>
            {Object.keys(step.data).map(value =>(
                <TextField  label={value} variant="standard" value={step.data[value]} InputProps={{ readOnly: true }} />
            ))}
            </>
            </div>
          ))}
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>}
    </div>
    </div>
  )
}

export default Projects