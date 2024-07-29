import { AppBarStyled, DrawerContainer, DrawerStyled, MainContent, Root } from './styles'
import { menuItems } from '../../data/data'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useState } from 'react'



const SideBar = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Chef')

  const handleListItemClick = (item: string) => {
    setSelectedItem(item)
  };

  const renderContent = () => {
    switch (selectedItem) {
      case 'Chef':
        return <Typography paragraph>Chef Information</Typography>
      case 'Restaurant':
        return <Typography paragraph>Restaurant Information</Typography>
      case 'Dish':
        return <Typography paragraph>Dish Information</Typography>
      default:
        return null
    }
  }

  return (
    <Root>
      <CssBaseline />
      <AppBarStyled position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Collection
          </Typography>
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled variant="permanent">
        <Toolbar />
        <DrawerContainer>
          <List>
            {menuItems.map((menuItem) => (
              <ListItem key={menuItem.text} disablePadding>
                <ListItemButton onClick={() => handleListItemClick(menuItem.text)}>
                  <ListItemIcon>
                    <menuItem.icon />
                  </ListItemIcon>
                  <ListItemText primary={menuItem.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DrawerContainer>
      </DrawerStyled>
      <MainContent component="main">
        <Toolbar />
        {renderContent()}
      </MainContent>
    </Root>
  )
}

export default SideBar
