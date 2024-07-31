import { TableCell, TableRow } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {Entity } from '../../data/types'
import * as utilService from '../../services/utils'
import { StyledActionBtn } from './styles'



interface GenericTableRowProps {
    row: Entity;
}

const GenericTableRow = ({ row }: GenericTableRowProps) => {
    const rowValues = Object.entries(row)

    const handleEdit = async (row: Entity) => {
        console.log(row)
    }
    const handleDelete = async (row: Entity) => {
        console.log(row)
    }

    return (
        <TableRow>
            {rowValues.map(([key, value], index) => (
                <TableCell key={index} align="right">
                    {utilService.formatValue(key, value)}
                </TableCell>
            ))}
            <TableCell align="right">
                <StyledActionBtn onClick={() => handleEdit(row)}>
                    <EditIcon />
                </StyledActionBtn>
            </TableCell>
            <TableCell align="right">
                <StyledActionBtn onClick={() => handleDelete(row)}>
                    <DeleteIcon />
                </StyledActionBtn>
            </TableCell>
        </TableRow>

    )
}

export default GenericTableRow
