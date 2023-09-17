
import React, {useContext, useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import './Header.css';
import UserContext from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
const drawerWidth = 240;
let navItems = ['Home', 'Projects', 'About', 'Contact', 'Login'];
const homeNavs = ['Why Optimize', 'Features', 'Under the Hood'];

function Header(props) {
  const { window } = props;
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(true)
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showNestedNav, setShowNestedNavs] = React.useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSetActive = () =>{
    setShowNestedNavs(prev => !prev);
  }
  const handleSetInActive =() =>{
   setShowNestedNavs(prev => !prev);
  }
  useEffect(() => {
    if(localStorage.getItem('email')) {
      setShowLogin(false);
        if(localStorage.getItem('email') == 'admin@altimus.energy') {
        navItems = ['Home', 'Projects', 'Files', 'About', 'Contact', 'Logout'];
      } else {
        navItems = ['Home', 'Projects', 'About', 'Contact', 'Logout'];
      }
    }
  },[])

  const showNavigation = (e) =>{
    e.stopPropagation();
    // setShowNestedNavs(true);
    setShowNestedNavs(prev => !prev);
    navigate('/home');
  } 

  const container = window !== undefined ? () => window().document.body : undefined;
  const logout = () =>{
    localStorage.removeItem('email')
    navigate("/login")
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Altimus   
        <Button style={{border: '1px solid black', marginLeft: '10px'}}><a className='drawer-a-links' href='/projects'>  Try Now</a></Button>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              { item != 'Login'&& item != 'Logout' && <a className='drawer-a-links' href={item}>{item}</a>}
              {item == 'Home' && <KeyboardArrowDownIcon onClick={(e) => showNavigation(e)}/>}
              {item == 'Login' && <> <a className='a-links' href={item}><PersonOutlineIcon style={{marginBottom: '-5px'}} color="primary"/></a></>}
              {item == 'Logout' && <> <a className='a-links' onClick={logout}><PersonIcon style={{marginBottom: '-5px'}} color="primary"/></a></>}
              {item == 'Home' && showNestedNav && <div className='drawer-links'>
              <Link  to="optimizeSection" smooth={true} duration={500} spy={true}
          exact="true" className='drawer-a-links'  onSetActive={handleSetActive}
          onSetInactive={handleSetInActive}>Why Optimize?</Link>
              <Link  to="featureSection" smooth={true} duration={500} className='drawer-a-links' spy={true}
          exact="true" onSetActive={handleSetActive}
          onSetInactive={handleSetInActive}>Features and Capabilities</Link>
              <Link  to="underHoodSection" smooth={true} duration={500} className='drawer-a-links' spy={true}
          exact="true" onSetActive={handleSetActive}
          onSetInactive={handleSetInActive}>Under The Hood</Link>
              </div>
                  }
              
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Altimus <Button style={{ color: '#fff', border: '1px solid white', margin: '5px'}}>
            <a className='a-links' href='/projects'>Try Now</a>

            </Button>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
             <> { item != "Login" && item != "Logout"  && <Button key={item} sx={{ color: '#fff' }}>
                {item != 'Logout' && item != 'Login' && <a className='a-links' href={item}>{item}</a>}
                {item == 'Home' && <KeyboardArrowDownIcon onClick={showNavigation}/>}
                {item == 'Home' && showNestedNav && <ul className='ui-links' >
                <li className='li-links'><Link  to="optimizeSection" smooth={true} duration={500} offset={-120} className='p-links' 
                spy={true} exact="true"  onSetActive={handleSetActive} onSetInactive={handleSetInActive} >Why Optimize?</Link></li>
                <li className='li-links'><Link  to="featureSection" smooth={true} duration={500} offset={-90} className='p-links' 
                 spy={true} exact="true"  onSetActive={handleSetActive} onSetInactive={handleSetInActive}>Features and Capabilities</Link></li>
                <li className='li-links'><Link  to="underHoodSection" smooth={true} duration={500} offset={-90} className='p-links' 
                 spy={true} exact="true"  onSetActive={handleSetActive} onSetInactive={handleSetInActive}>Under The Hood</Link></li>
                </ul>}
              </Button> }
              {item == 'Login' && <> <a className='a-links' href={item}><PersonOutlineIcon style={{marginBottom: '-5px'}}/></a></>}
              {item == 'Logout' && <> <a className='a-links' onClick={logout}><PersonIcon style={{marginBottom: '-5px'}}/></a></>}
              </>
            ))}
          </Box>
        </Toolbar>
        
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;