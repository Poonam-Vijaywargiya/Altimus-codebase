import React,{useContext, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import UserContext from '../../Context/UserContext';
import './Forms.css';
const ContractualRequirement = () => {
    const {userData,setUserData} = useContext(UserContext);
    const updateUserData = (e, v) =>{
        const currdata = JSON.parse(JSON.stringify(userData));
        currdata.formData[7].data[v] = e.target.value;
        setUserData(currdata)
    }
  return (
    <div className='individual-step'>
        {Object.keys(userData.formData[7].data).map(v =>(
            <TextField
            key={v}
            margin="dense"
            type={(v === 'Compliance Requirement' || v === 'Penalty Terms') ? 'text': 'number'}
            id={v}
            label={v}
            name={v}
            value={userData.formData[7].data[v]}
            autoFocus
            onChange={(e) => updateUserData(e,v)}
          />
        ))}
         
          </div>
  )
}

export default ContractualRequirement