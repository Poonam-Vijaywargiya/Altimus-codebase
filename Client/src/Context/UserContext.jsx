import { createContext } from 'react';
const UserContext = createContext({
    user:{},
    setUser: () => {},
    userData:{},
    setUserData: () => {},
    selectedPlantList: [],
    setSelectedPlantList: () =>{},
    projectFile: null, 
    setProjectFile: () =>{},
    forcastFile: null, 
    setForcastFile: () =>{}
});

export default UserContext