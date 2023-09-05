
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
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import './Header.css';
import UserContext from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
const drawerWidth = 240;
let navItems = ['Home', 'About', 'Contact', 'Projects', 'Login'];
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
        navigate("/home");
        navItems = ['Home', 'Projects', 'About', 'Contact', 'Login'];
    } else {
      setShowLogin(false);
        if(localStorage.getItem('email') == 'poonam.v@gmail.com') {
        navItems = ['Home', 'Projects', 'Files', 'About', 'Contact', 'Logout'];
      } else{
        navItems = ['Home', 'Projects', 'About', 'Contact', 'Logout'];
      } 
    }
  },[])
  const showNavigation = (e) =>{
    e.stopPropagation()
    setShowNestedNavs(prev => !prev)
  } 
  const container = window !== undefined ? () => window().document.body : undefined;
  const logout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    navigate("/login")
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Altimus
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
              {item == 'Home' && showNestedNav && <List>
                  <ListItem ><a className='drawer-a-links'  href='optimize'>Why Optimize?</a></ListItem>
                  <ListItem ><a className='drawer-a-links'  href='features'>Features and Capabilities</a></ListItem>
                  <ListItem ><a className='drawer-a-links'  href='underTheHood'>Under The Hood</a></ListItem>
                  </List>}
              
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
            <a className='a-links' href='/projects'>Try Now?</a>

            </Button>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
             <> { item != "Login" && item != "Logout"  && <Button key={item} sx={{ color: '#fff' }}>
                {item != 'Logout' && item != 'Login' && <a className='a-links' href={item}>{item}</a>}
                {item == 'Home' && <KeyboardArrowDownIcon onClick={showNavigation}/>}
                {item == 'Home' && showNestedNav && <ul className='ui-links'>
                <li className='li-links'><a className='nested-links' href='optimize'>Why Optimize?</a></li>
                <li className='li-links'><a className='nested-links' href='features'>Features and Capabilities</a></li>
                <li className='li-links'><a className='nested-links' href='underTheHood'>Under The Hood</a></li>
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