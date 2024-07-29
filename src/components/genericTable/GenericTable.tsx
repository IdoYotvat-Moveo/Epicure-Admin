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
interface GenericTableProps {
  entity: string
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]


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
          response = await chefService.getAllChefs();
          break;
        case 'restaurant':
          response = await restaurantService.getAllRestaurants();
          break;
        case 'dish':
          response = await dishService.getAllDishes();
          break;
        default:
          console.error('Unknown entity');
          return;
      }
      setData(response)
    } catch (err) {
      console.error(`GenericTable => could not get ${entity}`, err);
    }
  }



  if (!data || !data.length) return <div className="loader"></div>
  else console.log(data)

  return (
    (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{entity}</TableCell>
              <TableCell align="right">{entity}</TableCell>
              <TableCell align="right">{entity}</TableCell>
              <TableCell align="right">{entity}</TableCell>
              <TableCell align="right">{entity}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  )
}

export default GenericTable
