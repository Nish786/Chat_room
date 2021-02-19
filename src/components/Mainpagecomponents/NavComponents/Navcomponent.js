import React,{useState,useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import {Person,Close,AssignmentInd,Lock,ExitToApp} from '@material-ui/icons';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { Link, useHistory } from 'react-router-dom'
import {useAuth} from '../../../contexts/Authcontexts'
import { rdb } from '../../../firebase';
import { Navbar } from 'react-bootstrap';
import logo from '../Images/logo.png';
import './Navcomponent.css'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor:"#26b54c"
  },
  text:{
      margin:theme.spacing(1)
  },
  account:{
   marginRight:'auto'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor:"#30c758"
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Navcomponent() {

    const {currentUser,logout,username,setUsername} =useAuth();
    const history=useHistory()
    const [error,setError]=useState()
    
    async function handleSubmit(){
      try{
      await logout()
      history.push("/")
      setUsername('')
      }catch{
        setError("Failed to logout")
      }
    }
    function handleForgot(){
      history.push('/forgot-password');
    }
  const handleSignin=()=>{
    history.push('/login')
  }
  const handleSignup=()=>{
    history.push('/signup')
  }

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  useEffect(()=>{
      if(currentUser){
        rdb.child('person-details').on('value',snapshot=>{
        if(snapshot.val()!==null){
        Object.keys(snapshot.val()).map(id=>{
        if(snapshot.val()[id].email===currentUser.email) setUsername(snapshot.val()[id].name)
        })
       }})} 
   },[])

 
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })      }
      >
    <Navbar bg="#26b54c" expand="lg">
    <Navbar.Brand href="/"  className="navbar">
      <img
        alt=""
        src={logo}
        className="d-inline-block align-top logo"
      />
      CHAT ROOM
    </Navbar.Brand>
    <Button
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={ `login ${clsx(classes.menuButton, open && classes.hide)}`}
          >
          Profile<AccountCircle />
          </Button>
       </Navbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <Close /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            {currentUser && <ListItem button >
              <ListItemIcon><Person /></ListItemIcon>
              <ListItemText primary={username} />
            </ListItem>}
            {currentUser && <ListItem button >
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary={currentUser.email} />
            </ListItem>}
            {currentUser && <ListItem button >
              <ListItemIcon><AssignmentInd /></ListItemIcon>
              <ListItemText><Link style={{color:'#262624',textDecoration:'none'}} to="update-profile">Update Profile</Link> </ListItemText>
            </ListItem>}
            {currentUser && <ListItem button >
              <ListItemIcon><Lock /></ListItemIcon>
              <ListItemText primary="Forgot Password" onClick={handleForgot} />
            </ListItem>} 
            
        </List>
        <Divider />
        <List>
            {currentUser ? <ListItem button>
              <ListItemIcon><ExitToApp  />     
              </ListItemIcon>
              <ListItemText primary="Log Out" onClick={handleSubmit}/>
            </ListItem>:
            <List>
            <ListItem button>
            <ListItemIcon><ExitToApp  />     
            </ListItemIcon>
            <ListItemText primary="Sign In" onClick={handleSignin}/>
            </ListItem>
            <ListItem button>
            <ListItemIcon><ExitToApp  />     
            </ListItemIcon>
            <ListItemText primary="Sign Up" onClick={handleSignup}/>
            </ListItem>
            </List>
            }
        </List>
      </Drawer>
    </div>
  );
}
