import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/material/Menu';

const menuItems = ['Services', 'Pricing', 'Contact'];

const DesktopMenu = () => (
  <Toolbar>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Carwash
    </Typography>
    {menuItems.map((item) => (
      <Button color="inherit"  to={`/${item.toLowerCase()}`} key={item}>
        {item}
      </Button>
    ))}
  </Toolbar>
);

const MobileMenu = ({ handleDrawerOpen, drawerOpen, handleDrawerClose }) => (
  <Toolbar>
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={handleDrawerOpen}
    >
      <MenuIcon />
    </IconButton>

    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={handleDrawerClose}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item} onClick={handleDrawerClose}  to={`/${item.toLowerCase()}`}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Drawer>

    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Carwash
    </Typography>
  </Toolbar>
);

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <AppBar position="static">
      {isMobile ? (
        <MobileMenu handleDrawerOpen={handleDrawerOpen} drawerOpen={drawerOpen} handleDrawerClose={handleDrawerClose} />
      ) : (
        <DesktopMenu />
      )}
    </AppBar>
  );
};

export default Navbar;

