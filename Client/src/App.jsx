import './App.css';
import {useState} from 'react'
import UserContext from './Context/UserContext'
import { About, Features, Optimize, Contact, Projects, Login, UnderTheHood, Signup, Home, AllFiles } from './Components/index'
import { createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/Home",
      element:  <Home />,
    },
    {
      path: "/",
      element:  <Home />,
    },
    {
      path: "/features",
      element:  <Features />,
    },
    {
      path: "/optimize",
      element:  <Optimize />,
    },
    {
      path: "/about",
      element:  <About />,
    },
    {
      path: "/projects",
      element:  <Projects />,
    },
    {
      path: "/login",
      element:  <Login />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/underTheHood",
      element: <UnderTheHood />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/files",
      element: <AllFiles />,
    }
  ]);
  
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({
    projectName: '',
    projectShortDesc: '',
    projectDesc:'',
    file:'',
    formData:[
      {
      step: 1,
      stepLabel: 'General Component',
      data: {
        'Contracted Capacity (MW)':'',
        'Evacuation Capacity (MW)' : ''
      }
    },{
      step: 2,
      stepLabel: 'Solar Plant',
      data: {
      'Solar Module ($/wp)':'',
      'Solar Balance ($/wp)': '',
      'DC overloading (%)':'',
      }
    },{
      step: 3,
      stepLabel: 'Wind Plant',
      data: {
        'Wind Turnkey ($/MW)':''
      }
    },{
      step: 4,
      stepLabel: 'Transmission Infrastructure',
      data: {
        'Transmission line ($/wp)' : ''
      }
    },{
      step: 5,
      stepLabel: 'Plant/Grid Transmission Specification',
      data: {
        'Tx. Losses (%)' :'',
        'Project Up Time (%)' :'',
       'Grid Availability (%)':'',
       'Evacuation Capacity (MW)': ''
      }
    },{
      step: 6,
      stepLabel: 'Battery Specification',
      data: {
      'BESS Round_Trip Efficiency (%)': '',
      'Battery Rated Power (MW)': '',
      'Battery Price ($/kWh)':'',
      'Total Number of cycles': '',
      'Battery Chemistry' : '',
      'BESS Forecasted Price' : ''
      }
    },
  {
    step: '7',
    stepLabel: 'Financial Parameters',
    data:{
      "Debt (%)": "",
      "Repayment Period (Years)": "",
      "Interest Rate (%)": ""
    }
  }, {
    step: '8',
    stepLabel: 'Contractual Requirement',
    data:{
      "Project Capacity (MW)": "",
      "Contract Tenure (Years)": "",
      "Compliance Requirement": "",
      "Surplus_Energy Tariff (USD/kWh)": "",
      "Penalty Terms" :""
    }
  }]
  });
  const [selectedPlantList, setSelectedPlantList] = useState([]);
  const [projectFile, setProjectFile]  = useState(null);
  const [forcastFile, setForcastFile]  = useState(null);
  return (
    
    <UserContext.Provider value ={{user, setUser, userData, setUserData, selectedPlantList, setSelectedPlantList
      ,projectFile, setProjectFile, forcastFile, setForcastFile}}>
      <RouterProvider router={router}>
      <Home/>
      </RouterProvider>
    </UserContext.Provider>
  )
}

export default App;
