import React,{useContext, useState} from 'react'
import TextField from '@mui/material/TextField';
import UserContext from '../../Context/UserContext';
import './Forms.css';
const InitialForm = () => {
    const {userData,setUserData, setProjectFile} = useContext(UserContext);
  const handleFileUpload = async (e) => {
    setUserData((prev) => ({...userData, 'file': e.target.value}))
    setProjectFile(e.target.files[0]);
  };
    
  return (
    <> 
      <div className='individual-step' style={{marginTop: '10px'}}>
        <TextField
            margin="dense"
            id="projectName"
            label="Project Name"
            name="projectName"
            value={userData.projectName}
            onChange={(e) => setUserData((prev) => ({...userData, 'projectName': e.target.value}))}
      /></div> 
      <div className='individual-step' style={{marginTop: '5px'}}>
      <TextField 
          multiline
          placeholder="Please Enter Project Short Description"
          rows={1}
          maxRows={2} 
          value={userData.projectShortDesc}
          label="Project Short Description"
          onChange={(e) => setUserData((prev) => ({...userData, 'projectShortDesc': e.target.value}))}
      /></div> 
      <div className='individual-step' style={{marginTop: '10px'}}>
      <TextField 
          multiline
          placeholder="Please Explain Project Details"
          rows={8}
          label="Project Description"
          value={userData.projectDesc}
          maxRows={16} 
          onChange={(e) => setUserData((prev) => ({...userData, 'projectDesc': e.target.value}))}
      /></div> 
      <div className='individual-step'>
      <TextField
          type="file"
          margin="dense"
          id="file"
          inputProps={{accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"}}
          name="excelFile"

          onChange={(e) => handleFileUpload(e)}
      /> </div>
      {userData.file && <p>Uploaded File Name: {userData.file}</p>}
    </>
  )
}

export default InitialForm