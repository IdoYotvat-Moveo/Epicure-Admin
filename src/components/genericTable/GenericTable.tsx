import { useEffect, useState } from 'react'
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
import * as userService from '../../services/user.service'
import FormModal from '../formModal/FormModal'
import { Chef, Dish, Entity, EntityType, Restaurant } from '../../data/types'
import { Alert, AlertTitle } from '@mui/material'


interface GenericTableProps {
  entity: EntityType
}

const GenericTable = ({ entity }: GenericTableProps) => {
  const [open, setOpen] = useState(false)
  const [initialData, setInitialData] = useState<Chef | Restaurant | Dish | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    try {
      const adminStatus = userService.checkIsAdmin()
      setIsAdmin(adminStatus)
    } catch (err) {
      console.log('Cannot retrieve token or check admin status:', err)
    }
  }, [])

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
      console.error(`GenericTable => could not get ${entity}`, err)
    }
  }

  const handleEdit = (row: Entity) => {
    setOpen(true)
    setInitialData(row)

  }

  const handleDelete = async (row: Entity) => {
    if (!row._id) {
      console.error('No ID provided for deletion')
      return;
    }
    try {
      switch (entity.toLowerCase()) {
        case 'chef':
          dispatch(chefThunks.removeChef({ id: row._id }))
          break;
        case 'restaurant':
          dispatch(restaurantThunks.removeRestaurant({ id: row._id }))
          break;
        case 'dish':
          dispatch(dishThunks.removeDish({ id: row._id }))
          break;
        default:
          console.error('Unknown entity')
          return
      }
    } catch (error) {
      console.log('genericTable => cannot remove entity =>', error)

    }
  }


  if (!data || !data.length) return <div className="loader"></div>
  const headers = Object.keys(data[0])

  return (
    (<>
      <FormModal entity={entity} open={open} setOpen={setOpen} initialData={initialData} setInitialData={setInitialData} isAdmin={isAdmin} />
      <TableContainer component={Paper}>
        <StyledTable aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} align="left">{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <GenericTableRow key={index} row={row} onEdit={handleEdit} onDelete={handleDelete} entity={entity} isAdmin={isAdmin} />
            ))}
          </TableBody>
        </StyledTable>
        { !isAdmin && 
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            You are NOT the Admin, and cannot perform operations.
          </Alert>}
      </TableContainer>
    </>
    )
  )
}

export default GenericTable
