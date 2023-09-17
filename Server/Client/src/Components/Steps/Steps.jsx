import React, {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import {Typography, TextField} from '@mui/material';
import UserContext from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {BatterySpec, GeneralComponent, PlantGridTrans, WindPlant, SolarPlant, TransInfra,
  InitialForm, PreviewProject, ContractualRequirement, FinancialParams} from '..';
const Steps = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
const {userData, setUserData, selectedPlantList, setSelectedPlantList, user, projectFile, forcastFile} = useContext(UserContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [steps, setSteps]  = React.useState(['General Details','General Components', 'Transmission Infra.','Grid Specs.', 'Financial Params', 'Contractual Req.'])
  useEffect(() =>{
    let stepsCopy = [];
    if(selectedPlantList.indexOf('wind') >-1 && selectedPlantList.indexOf('solar') >-1 && selectedPlantList.indexOf('battery') == -1) {
      stepsCopy = ['General Details','General Components', 'Transmission Infra.','Grid Specs.','Financial Params', 'Contractual Req.', 'Solar Plant', 'Wind Plant'];
    }
    if(selectedPlantList.indexOf('solar') >-1 && selectedPlantList.indexOf('battery') >-1 && selectedPlantList.indexOf('wind') == -1) {
      stepsCopy = ['General Details','General Components', 'Transmission Infra.','Grid Specs.','Financial Params', 'Contractual Req.', 'Solar Plant', 'Battery Specs.'];
    } 
    if(selectedPlantList.indexOf('wind') >-1 && selectedPlantList.indexOf('battery') >-1 && selectedPlantList.indexOf('solar') == -1 ) {
      stepsCopy = ['General Details','General Components', 'Transmission Infra.','Grid Specs.','Financial Params', 'Contractual Req.', 'Wind Plant', 'Battery Specs.'];
    }
    if(selectedPlantList.indexOf('wind') >-1 && selectedPlantList.indexOf('battery') >-1 && selectedPlantList.indexOf('solar') > -1 ) {
      stepsCopy = ['General Details','General Components', 'Transmission Infra.','Grid Specs.', 'Financial Params', 'Contractual Req.','Solar Plant', 'Wind Plant', 'Battery Specs.'];
    }
    setSteps(stepsCopy)
  },[selectedPlantList])
  const isStepOptional = (step) => {
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      userData: userData,
      email: localStorage.getItem("email")
    }
    const res = await fetch('/api/addnewproject', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(postData)
    });
    const resData = await res.json();
    const projectid = resData.projectid;
    const projectname = resData.name;
    if(resData.status == 'ok' ) {
      const formData = new FormData();
      if(projectFile) {
        formData.append('excelFile', projectFile);
      }
      formData.append('email', localStorage.getItem('email'));
      formData.append('type', 'project-file');
      formData.append('projectid', projectid);
      formData.append('projectname', projectname);
      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if(resData.status == 'ok' && forcastFile) {
          const formData = new FormData();
          formData.append('excelFile', forcastFile);
          formData.append('email', localStorage.getItem('email'));
          formData.append('type', 'forcast-file');
          formData.append('projectid', projectid);
          formData.append('projectname', projectname);
          const response = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    }
    if(resData.status == 'ok') {
      // navigate("/");
      setOpen(true);
    }
  }

  return (
    //sx={{ width: '100%' }}
    <Box sx={{ width: '100%'}}>
      <Stepper style={{flexWrap: 'wrap'}} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })} 
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
         {activeStep != 0 && <PreviewProject/> }
          </Typography>
         { activeStep != 0 && <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button style={{fontSize: '18px'}} onClick={handleBack}>Back</Button>
            <Button style={{fontSize: '18px'}} onClick={handleSubmit}>Submit</Button>
            <Button style={{fontSize: '18px'}} onClick={handleReset}>Reset</Button>
          </Box> }
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: 1 }}>
            { activeStep == 0 && <InitialForm/>}
            { activeStep == 1 && <GeneralComponent/>}
            { activeStep == 2 && <TransInfra/>} 
            { activeStep == 3 && <PlantGridTrans/>} 
            { activeStep == 4 && <FinancialParams/>} 
            { activeStep == 5 && <ContractualRequirement/>} 
          
            {steps.indexOf('Wind Plant') > -1 && steps.indexOf('Solar Plant') > -1  &&  steps.indexOf('Battery Specs.') == -1
            &&  activeStep == 6  && <> <SolarPlant/></>
            }
            {steps.indexOf('Wind Plant') > -1 && steps.indexOf('Solar Plant') > -1 &&  steps.indexOf('Battery Specs.') == -1
            &&  activeStep == 7 && <> <WindPlant/></>
            }

            {steps.indexOf('Wind Plant') > -1 && steps.indexOf('Battery Specs.') > -1 &&  steps.indexOf('Solar Plant') == -1
            &&  activeStep == 6 &&  <><WindPlant/> </>
            }
            {steps.indexOf('Wind Plant') > -1 && steps.indexOf('Battery Specs.') > -1 &&  steps.indexOf('Solar Plant') == -1
            &&  activeStep == 7 && <> <BatterySpec/> </>
            }

            {steps.indexOf('Solar Plant') > -1 && steps.indexOf('Battery Specs.') > -1 && steps.indexOf('Wind Plant') == -1
            &&  activeStep == 6 && <> <SolarPlant/></>
            }
            {steps.indexOf('Solar Plant') > -1 && steps.indexOf('Battery Specs.') > -1 && steps.indexOf('Wind Plant') == -1
            &&  activeStep == 7 && <> <BatterySpec/></>
            }
            {steps.indexOf('Solar Plant') > -1 && steps.indexOf('Battery Specs.') > -1 && steps.indexOf('Wind Plant') > -1
            &&  activeStep == 6 && <>  <SolarPlant/></>
            }
            {steps.indexOf('Solar Plant') > -1 && steps.indexOf('Battery Specs.') > -1 && steps.indexOf('Wind Plant') > -1
            &&  activeStep == 7 &&  <>  <WindPlant/></>
            }
            {steps.indexOf('Solar Plant') > -1 && steps.indexOf('Battery Specs.') > -1 && steps.indexOf('Wind Plant') > -1
            &&  activeStep == 8 && <>  <BatterySpec/></>
            }
            
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-around'}}>
            <Button style={{fontSize: '18px'}} color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} >
              Back
            </Button>
            <Button style={{fontSize: '18px'}} onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Preview' : 'Next'}
            </Button>
            {activeStep === steps.length - 1 &&   <Button style={{fontSize: '18px'}} onClick={handleSubmit}> 
              Submit 
            </Button>  }
          </Box>
        </React.Fragment>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thanks for submitting the requirements.</DialogTitle>
        <DialogContent>
          <DialogContentText>
          We shall be sending you an email with a link to the results of the optimization in the next 24- 48 hours.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default Steps