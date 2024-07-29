import PersonIcon from '@mui/icons-material/Person'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import RamenDiningIcon from '@mui/icons-material/RamenDining'
import { SvgIconComponent } from '@mui/icons-material'

interface MenuItem {
  text: string
  icon: SvgIconComponent
}

export const menuItems: MenuItem[] = [
  { text: 'Chef', icon: PersonIcon },
  { text: 'Restaurant', icon: RestaurantMenuIcon },
  { text: 'Dish', icon: RamenDiningIcon },
];
