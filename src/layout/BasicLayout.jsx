import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, CssBaseline, Box, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotLogged } from '../redux/authSlice';
const BasicLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth)
  const authDispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout =()=>{
    authDispatch(setNotLogged())
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItemsNotLogged = [
    {
      url: "/",
      title: "Lista de tareas"
    },
    {
      url: "/login",
      title: "Iniciar sesion"
    }
  ]

  const menuItemsLogged = [
    {
      url: "/",
      title: "Lista de tareas"
    },

  ]
  const [menuItems, setMenuItems] = useState(menuItemsNotLogged)

  useEffect(() => {
    if (authStatus.isAuthenticated) {
      setMenuItems(menuItemsLogged)
    } else {
      setMenuItems(menuItemsNotLogged)
      navigate('/login')
    }
  }, [authStatus])


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Steven Cordero Alvarez - Prueba AF - ToDoList Redux
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='persistent'
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"

          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List sx={{ width: "100%", borderRadius: 2, padding: 1 }}>
            <ListItem>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2, ml: 1, p: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </ListItem>
            {
              menuItems.map(item =>
                <ListItem key={item.url}>
                  <Box >
                    <NavLink style={{ color: "black", textDecoration: "underline", padding: "2px" }} to={item.url}>{item.title}</NavLink>
                  </Box>
                </ListItem>
              )
            }
            {
              authStatus ? (
                <ListItem >
                  <Box >
                    <Button variant='outlined' onClick={handleLogout}>Salir</Button>
                  </Box>
                </ListItem>
              ) : (null)
            }
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default BasicLayout