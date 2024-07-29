import { useEffect, useState } from 'react'
import { Chef, Dish, Restaurant } from '../../data/types'
import * as chefService from '../../services/chef.service'
import * as restaurantService from '../../services/restaurant.service'
import * as dishService from '../../services/dish.service'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import GenericTableRow from '../genericTableRow/GenericTableRow'
interface GenericTableProps {
  entity: string
}

const GenericTable = ({ entity }: GenericTableProps) => {
  const [data, setData] = useState<Chef[] | Restaurant[] | Dish[]>([])

  useEffect(() => {
    loadTable()
  }, [entity])

  const loadTable = async () => {
    try {
      let response;
      switch (entity.toLowerCase()) {
        case 'chef':
          console.log('chef')
          response = await chefService.getAllChefs()
          break;
        case 'restaurant':
          response = await restaurantService.getAllRestaurants()
          break;
        case 'dish':
          response = await dishService.getAllDishes()
          break;
        default:
          console.error('Unknown entity')
          return;
      }
      setData(response)
    } catch (err) {
      console.error(`GenericTable => could not get ${entity}`, err);
    }
  }

  if (!data || !data.length) return <div className="loader"></div>
  else console.log(data)

  const headers = Object.keys(data[0])

  return (
    (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
        </Table>
      </TableContainer>
    )
  )
}

export default GenericTable
