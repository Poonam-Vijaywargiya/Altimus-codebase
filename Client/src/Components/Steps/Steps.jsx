import React, {useContext, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import {Typography, TextField} from '@mui/material';
import UserContext from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BatterySpec, GeneralComponent, PlantGridTrans, WindPlant, SolarPlant, TransInfra,
  InitialForm, PreviewProject, ContractualRequirement, FinancialParams} from '../../Components';
import { Preview } from '@mui/icons-material';
const Steps = () => {
  const navigate = useNavigate();
const {userData, setUserData, selectedPlantList, setSelectedPlantList, user, projectFile, forcastFile} = useContext(UserContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [steps, setSteps]  = React.useState(['General details','General Componets', 'Transmission Infrastructure','Plant / Grid / Transmission specifications', 'Financial Parameters', 'Contractual Requirement'])
  useEffect(() =>{
    let stepsCopy = [];
    if(selectedPlantList.indexOf('wind') >-1 && selectedPlantList.indexOf('solar') >-1 && selectedPlantList.indexOf('battery') == -1) {
      stepsCopy = ['General details','General Componets', 'Transmission Infrastructure','Plant / Grid / Transmission specifications','Financial Parameters', 'Contractual Requirement', 'Solar Plant', 'Wind Plant'];
    }
    if(selectedPlantList.indexOf('solar') >-1 && selectedPlantList.indexOf('battery') >-1 && selectedPlantList.indexOf('wind') == -1) {
      stepsCopy = ['General details','General Componets', 'Transmission Infrastructure','Plant / Grid / Transmission specifications','Financial Parameters', 'Contractual Requirement', 'Solar Plant', 'Battery Specifications'];
    } 
    if(selectedPlantList.indexOf('wind') >-1 && selectedPlantList.indexOf('battery') >-1 && selectedPlantList.indexOf('solar') == -1 ) {
      stepsCopy = ['General details','General Componets', 'Transmission Infrastructure','Plant / Grid / Transmission specifications','Financial Parameters', 'Contractual Requirement', 'Wind Plant', 'Battery Specifications'];
    }
    if(selectedPlantList.indexOf('wind') >-1 && selectedPlantList.indexOf('battery') >-1 && selectedPlantList.indexOf('solar') > -1 ) {
      stepsCopy = ['General details','General Componets', 'Transmission Infrastructure','Plant / Grid / Transmission specifications', 'Financial Parameters', 'Contractual Requirement','Solar Plant', 'Wind Plant', 'Battery Specifications'];
    }
    setSteps(stepsCopy)
  },[selectedPlantList])
  const isStepOptional = (step) => {
    return step === 1;
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
    if(resData.status == 'ok' && projectFile) {
      const formData = new FormData();
      formData.append('excelFile', projectFile);
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
      navigate("/");
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
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleReset}>Reset</Button>
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
          
            {steps.indexOf('Wind Plant') > -1 && steps.indexOf('Solar Plant') > -1  &&  steps.indexOf('Battery Specifications') == -1
            &&  activeStep == 6  && <> <SolarPlant/></>
            }
            {steps.indexOf('Wind Plant') > -1 && steps.indexOf('Solar Plant') > -1 &&  steps.indexOf('Battery Specifications') == -1
            &&  activeStep == 7 && <> <WindPlant/></>
            }

            {steps.indexOf('Wind Plant') > -1 && steps.indexOf('Battery Specifications') > -1 &&  steps.indexOf('Solar Plant') == -1
            &&  activeStep == 6 &&  <><WindPlant/> </>
            }
            {steps.indexOf('Wind Plant') > -1 && steps.indexOf('Battery Specifications') > -1 &&  steps.indexOf('Solar Plant') == -1
            &&  activeStep == 7 && <> <BatterySpec/> </>
            }

            {steps.indexOf('Solar Plant') > -1 && steps.indexOf('Battery Specifications') > -1 && steps.indexOf('Wind Plant') == -1
            &&  activeStep == 6 && <> <SolarPlant/></>
            }
            {steps.indexOf('Solar Plant') > -1 && steps.indexOf('Battery Specifications') > -1 && steps.indexOf('Wind Plant') == -1
            &&  activeStep == 7 && <> <BatterySpec/></>
            }
            {steps.indexOf('Solar Plant') > -1 && steps.indexOf('Battery Specifications') > -1 && steps.indexOf('Wind Plant') > -1
            &&  activeStep == 6 && <>  <SolarPlant/></>
            }
            {steps.indexOf('Solar Plant') > -1 && steps.indexOf('Battery Specifications') > -1 && steps.indexOf('Wind Plant') > -1
            &&  activeStep == 7 &&  <>  <WindPlant/></>
            }
            {steps.indexOf('Solar Plant') > -1 && steps.indexOf('Battery Specifications') > -1 && steps.indexOf('Wind Plant') > -1
            &&  activeStep == 8 && <>  <BatterySpec/></>
            }
            
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-around'}}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} >
              Back
            </Button>
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Preview' : 'Next'}
            </Button>
            {activeStep === steps.length - 1 &&   <Button onClick={handleSubmit}> 
              Submit 
            </Button>  }
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
export default Steps