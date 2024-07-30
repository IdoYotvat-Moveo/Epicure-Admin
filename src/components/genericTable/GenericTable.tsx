import { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { StyledTable } from './styles'
import { RootState } from '../../redux/store/root-reducer'
import GenericTableRow from '../genericTableRow/GenericTableRow'
import { AppDispatch } from '../../redux/store/store'
import * as dishThunks from '../../redux/chunks/dish/dish.thunks'
import * as chefThunks from '../../redux/chunks/chef/chef.thunks'
import * as restaurantThunks from '../../redux/chunks/restaurant/restaurant.thunks'
import FormModal from '../formModal/FormModal'
import { EntityType } from '../../data/types'


interface GenericTableProps {
  entity: EntityType
}

const GenericTable = ({ entity }: GenericTableProps) => {
  const dispatch: AppDispatch = useDispatch()
  const data = useSelector((state: RootState) => {
    switch (entity) {
      case 'chef':
        return state.chefs.chefs
      case 'restaurant':
        return state.restaurants.restaurants
      case 'dish':
        return state.dishes.dishes
      default:
        return []
    }
  }, shallowEqual)

  useEffect(() => {
    if (!data || !data.length) {
      loadTable()
    }
  }, [entity])

  const loadTable = async () => {
    try {
      switch (entity.toLowerCase()) {
        case 'chef':
          dispatch(chefThunks.getAllChefs())
          break;
        case 'restaurant':
          dispatch(restaurantThunks.getAllRestaurants())
          break;
        case 'dish':
          dispatch(dishThunks.getAllDishes())
          break;
        default:
          console.error('Unknown entity')
          return
      }
    } catch (err) {
      console.error(`GenericTable => could not get ${entity}`, err);
    }
  }

  if (!data || !data.length) return <div className="loader"></div>
  const headers = Object.keys(data[0])

  return (
    (<>
      <FormModal entity={entity}/>
      <TableContainer component={Paper}>
        <StyledTable aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} align="right">{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <GenericTableRow key={index} row={row} />
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </>
    )
  )
}

export default GenericTable
