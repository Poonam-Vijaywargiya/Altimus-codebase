

import React,{useContext, useState} from 'react'
import {TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@mui/material';
import UserContext from '../../Context/UserContext';
import './Forms.css';
const BatterySpec = () => {
    const {userData,setUserData, setForcastFile} = useContext(UserContext);
    const [chemisrtyUserInput, setChemisrtyUserInput]  = useState('');
    const [forcastUserInput, setForcastUserInput]  = useState('');
    const [showChemisrtyInput, setShowChemisrtyInput] = useState(false);
    const [showForcastInput, setShowForcastInput] = useState(false);
    const updateUserData = (e, key) =>{
        const currdata = JSON.parse(JSON.stringify(userData));
        currdata.formData[5].data[key] = e.target.value;
        setUserData(currdata)
    }
    const changeChemistryRadio =  (e) => {
      if(e.target.value == 'Let Altimus Decide') {
        userData.formData[5].data['Battery Chemistry'] = 'Let Altimus Decide';
        setShowChemisrtyInput(false);
        const currdata = JSON.parse(JSON.stringify(userData));
        delete currdata.formData[5].data['Chemisrty User Input']
        setUserData(currdata);
      } else {
        userData.formData[5].data['Battery Chemistry'] = 'User Text Input';
        setShowChemisrtyInput(true)
      }
    }
    const changeForecastedRadio =  (e) => {
      if(e.target.value == 'Let Altimus Decide') {
        userData.formData[5].data['BESS Forecasted Price'] = 'Let Altimus Decide';
        setShowForcastInput(false);
        const currdata = JSON.parse(JSON.stringify(userData));
        delete currdata.formData[5].data['Forcast User Input']
        setUserData(currdata);
      } else {
        userData.formData[5].data['BESS Forecasted Price'] = 'User Excel Input';
        setShowForcastInput(true)
      }
    }
    const updateUserInput = (e) =>{
      setChemisrtyUserInput(e.target.value);
    }
    const updateForcastUserInput  = (e) => {
      setForcastUserInput(e.target.value);
      setForcastFile(e.target.files[0]);
    }
    const addChemistryUserInput = () => {
      userData.formData[5].data['Chemisrty User Input'] = chemisrtyUserInput;
      setShowChemisrtyInput(false)
    }

    const addForcastUserInput = () =>{
      userData.formData[5].data['Forcast User Input'] = forcastUserInput;
      setShowForcastInput(false);
    }
  return (
    <div className='individual-step'>
        {Object.keys(userData.formData[5].data).map(v =>(
         <> {v.indexOf('Battery Chemistry') != -1 && <><FormControl>
          <FormLabel >Battery Chemistry</FormLabel>
          <RadioGroup
            defaultValue="Let Altimus Decide"
            name={v}
            onChange={(e) => changeChemistryRadio(e)}
          >
            <FormControlLabel value="Let Altimus Decide" control={<Radio />} label="Let Altimus Decide" />
            <FormControlLabel value="User Input" control={<Radio />} label="User Text Input" />
          </RadioGroup>
        </FormControl> 
        { showChemisrtyInput && 
       <> <TextField
        margin="dense"
        type="text"
        id="chemisrtyUserInput"
        label="Chemisrty User Input"
        name="chemisrtyUserInput"
        value={chemisrtyUserInput}
        autoFocus
        onChange={(e) => updateUserInput(e)} /> 
        <Button variant="contained"
        sx={{ mt: 2, mb: 2 }} onClick={addChemistryUserInput}>Add Chemistry Input</Button> 
        </> } </>
        }
        {v.indexOf('BESS Forecasted Price') != -1 && 
        <><FormControl>
          <FormLabel >BESS Forecasted Price</FormLabel>
          <RadioGroup
            defaultValue="Let Altimus Decide"
            name={v}
            onChange={(e) => changeForecastedRadio(e)}
          >
            <FormControlLabel value="Let Altimus Decide" control={<Radio />} label="Let Altimus Decide" />
            <FormControlLabel value="User Excel Input" control={<Radio />} label="User Excel Input" />
          </RadioGroup>
        </FormControl>  { showForcastInput && 
       <> <TextField
            type="file"
            margin="dense"
            id="forcastfile"
            inputProps={{accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"}}
            name="forcastExcelFile"
            autoFocus
            onChange={(e) => updateForcastUserInput(e)} />
        <Button variant="contained"
        sx={{ mt: 2, mb: 2 }} onClick={addForcastUserInput}>Add Forcasted Input</Button> 
        </> }  <>Uploaded File Name: {forcastUserInput}</></>}

        {v.indexOf('Battery Chemistry') == -1 && v.indexOf('BESS Forecasted Price') == -1 && <TextField
         margin="dense"
         type={(v === 'Chemisrty User Input' || v === 'Forcast User Input') ? 'text': 'number'}
         id={v}
         label={v}
         name={v}
         value={userData.formData[5].data[v]}
         autoFocus
         onChange={(e) => updateUserData(e,v)}
       />
        }  </> 
        ))}
          </div>
  )
}

export default BatterySpec