import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { useState } from 'react';


const drawerWidth = 240;

const SideBar = () => {
    const [selectedItem, setSelectedItem] = useState<string>('Chef');

    const handleListItemClick = (item: string) => {
      setSelectedItem(item);
    };
  
    const renderContent = () => {
      switch (selectedItem) {
        case 'Chef':
          return <Typography paragraph>Chef Information</Typography>;
        case 'Restaurant':
          return <Typography paragraph>Restaurant Information</Typography>;
        case 'Dish':
          return <Typography paragraph>Dish Information</Typography>;
        default:
          return null
      }
    }
    
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Collection
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Chef', 'Restaurant', 'Dish'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleListItemClick(text)} >
                  <ListItemIcon>
                    {index === 0 && <PersonIcon /> }
                    {index === 1 && <RestaurantMenuIcon />}
                    {index === 2 && <RamenDiningIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  )
}

export default SideBar
