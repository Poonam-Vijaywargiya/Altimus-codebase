import React,{useContext, useEffect, useState} from 'react'
import {TextField, Button} from '@mui/material';
import UserContext from '../../Context/UserContext';
import AddBoxIcon from '@mui/icons-material/AddBox';
import './Forms.css';
const TransInfra = () => {
    const {userData,setUserData} = useContext(UserContext);
    const [showNewField,setShowNewFields]= useState(false);
    const [fieldValue, setFieldValue] = useState('')
    const [fieldLabel, setFieldLabel] = useState('')
    const updateUserData = (e, key) =>{
        const currdata = JSON.parse(JSON.stringify(userData));
        currdata.formData[3].data[key] = e.target.value;
        setUserData(currdata)
    }
    const addMoreTransInfraPlants = () =>{
        setShowNewFields(true);
    }
    const addMoreFields = (e) =>{
        const currdata = JSON.parse(JSON.stringify(userData));
        currdata.formData[3].data[fieldLabel] =fieldValue;
        setUserData(currdata)
        setShowNewFields(false);
        setFieldLabel("");
        setFieldValue("")
    }
  return (
    <div className='individual-step'>
        {Object.keys(userData.formData[3].data).map(v =>(
            <TextField
            margin="dense"
            type="number"
            id={v}
            label={v}
            name={v}
            value={userData.formData[3].data[v]}
            onChange={(e) => updateUserData(e,v)}
          />
            
        ))}
        <Button variant="contained"
        sx={{ mt: 2, mb: 2 }}><AddBoxIcon onClick={addMoreTransInfraPlants}/></Button> 
    {  showNewField &&  <><TextField
            margin="dense"
            id="fieldLabel"
            label="Field Label"
            name="fieldLabel"
            value={fieldLabel}
            onChange={(e) => setFieldLabel(e.target.value)}
            /> 
            <TextField
            margin="dense"
            type="number"
            id="fieldValue"
            label="Field Value"
            name="fieldValue"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            />
            <Button variant="contained"
            sx={{ mt: 2, mb: 2 }} onClick={addMoreFields}>Add New Fields</Button> 
            </>     }
        </div>
  )
}

export default TransInfra