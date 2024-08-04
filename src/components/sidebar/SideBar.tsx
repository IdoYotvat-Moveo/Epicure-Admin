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
import { Outlet, useNavigate } from 'react-router-dom'



const SideBar = () => {
  const navigate = useNavigate()

  const handleListItemClick = (path: string) => {
    navigate(`/${path.toLowerCase()}`)
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
        <Outlet/>
      </MainContent>
    </Root>
  )
}

export default SideBar
