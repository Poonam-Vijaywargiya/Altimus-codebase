import React,{useContext, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import UserContext from '../../Context/UserContext';
import './Forms.css';
const GeneralComponent = () => {
    const {userData,setUserData} = useContext(UserContext);
    const updateUserData = (e, v) =>{
        const currdata = JSON.parse(JSON.stringify(userData));
        currdata.formData[0].data[v] = e.target.value;
        setUserData(currdata)
    }
  return (
    <div className='individual-step'>
        {Object.keys(userData.formData[0].data).map(v =>(
            <TextField
            key={v}
            margin="dense"
            type="number"
            id={v}
            label={v}
            name={v}
            value={userData.formData[0].data[v]}
            onChange={(e) => updateUserData(e,v)}
          />
        ))}
          </div>
  )
}

export default GeneralComponent