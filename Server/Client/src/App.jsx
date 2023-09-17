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
      stepLabel: 'General Components',
      data: {
        'Contracted Capacity (MW)':'',
        'Evacuation Capacity (MW)' : ''
      }
    },{
      step: 2,
      stepLabel: 'Solar Plant',
      data: {
      'Solar Module ($/Wp)':'',
      'Solar Balance ($/Wp)': '',
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
      stepLabel: 'Transmission Infra',
      data: {
        'Transmission Line Length (kms)': '',
        'Transmission Line Cost ($ thousands/km)' : ''
      }
    },{
      step: 5,
      stepLabel: 'Grid Specs.',
      data: {
        'Tx. Losses (%)' :'',
        'Project Up Time (%)' :'',
       'Grid Availability (%)':''
      }
    },{
      step: 6,
      stepLabel: 'Battery Specs.',
      data: {
      'BESS Round_Trip Efficiency (%)': '',
      'Battery Price ($/kWh)-(inclusive of PCS price and AC BoS)':'',
      'Total Number of cycles': '',
      'Battery Chemistry' : '',
      'BESS Forecasted Price' : ''
      }
    },
  {
    step: '7',
    stepLabel: 'Financial Params',
    data:{
      "Debt (%)": "",
      "Repayment Period (Years)": "",
      "Interest Rate (%)": ""
    }
  }, {
    step: '8',
    stepLabel: 'Contractual Req.',
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
