import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';

const drawerWidth = 240;

export const Root = styled(Box)({
  display: 'flex',
});

export const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export const DrawerStyled = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export const DrawerContainer = styled(Box)({
  overflow: 'auto',
});

export const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));
