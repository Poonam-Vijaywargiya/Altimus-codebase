import React, {useState, useEffect, useContext} from 'react'
import {Steps} from '../../Components/index';
import graphics from '../../assets/background.svg'
import Button from '@mui/material/Button';
import UserContext from '../../Context/UserContext';
import './Projects.css'
const CreateNewProject = () => {
  const [showForm, setShowForm] = useState(false);
  const {selectedPlantList, setSelectedPlantList} = useContext(UserContext);
  const selectPlantType = (e) =>{
    let  plantList = [...selectedPlantList];
    if(selectedPlantList.indexOf(e.target.id)>-1){
      plantList.splice(selectedPlantList.indexOf(e.target.id), 1)
    } else {
      plantList.push(e.target.id)
    }
    setSelectedPlantList(plantList)
  }

  useEffect(() =>{
    if(selectedPlantList.length >= 2) {
      setShowForm(true)
    } else {
      setShowForm(false)
    }
  },[selectedPlantList])
  return (
    <div className='create-new-project-container' style={{background: `url(${graphics})`, backgroundRepeat: 'no-repeat', backgroundSize: '80%'}}>
      <div style={{display: 'flex', justifyContent: 'space-around', margin: '20px'}}> Select minimum two plant types to continue</div>
      <div style={{display: 'flex', justifyContent: 'space-around', marginBottom:'20px'}} onClick={selectPlantType}>
        <Button variant={selectedPlantList.indexOf('wind') > -1? 'contained': 'outlined'} id="wind">Wind Plant</Button>
        <Button variant={selectedPlantList.indexOf('solar') > -1? 'contained': 'outlined'}  id="solar">Solar Plant</Button>
        <Button variant={selectedPlantList.indexOf('battery') > -1? 'contained': 'outlined'}  id="battery">Battery Plant</Button>
        
        </div>
     { showForm && <Steps/>}</div>
  )
}

export default CreateNewProject