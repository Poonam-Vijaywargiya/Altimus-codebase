import React,{useContext, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import UserContext from '../../Context/UserContext';

const PreviewProject = () => {
    const {userData,selectedPlantList} = useContext(UserContext);
  return (
    <div>
        <div style={{display:'flex', flexDirection:'column'}}>
        <div style={{ display:'flex', flexDirection:'column', marginTop: '10px',marginBottom: '10px', borderRadius: '20px', border: '1px solid gray', padding: '15px'}}>
            <div style={{marginTop: '20px',marginBottom: '20px'}}>Project Details</div>
            <TextField  label="Project Name" variant="standard" value={userData.projectName} InputProps={{
            readOnly: true,
          }} />
        <TextField label="Project Short Description" variant="standard"  value={userData.projectShortDesc} InputProps={{
            readOnly: true,
          }} />
        <TextField  label="Project Description" variant="standard" value={userData.projectDesc} InputProps={{
            readOnly: true,
          }} />
          <TextField  label="Project File" variant="standard" value={userData.file} InputProps={{
            readOnly: true,
          }} />
          </div>
          {userData.formData.map(step => (
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
    </div>
  )
}

export default PreviewProject