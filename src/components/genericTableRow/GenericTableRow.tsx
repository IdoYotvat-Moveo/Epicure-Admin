import { TableCell, TableRow } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Entity } from '../../data/types'
import * as utilService from '../../services/utils'
import { StyledActionBtn } from './styles'



interface GenericTableRowProps {
    row: Entity;
    onEdit: (row: Entity) => void
    onDelete: (row: Entity) => void
}

const GenericTableRow = ({ row,onDelete,onEdit }: GenericTableRowProps) => {
    const rowValues = Object.entries(row)

    return (
        <TableRow>
            {rowValues.map(([key, value], index) => (
                <TableCell key={index} align="right">
                    {utilService.formatValue(key, value)}
                </TableCell>
            ))}
            <TableCell align="right">
                <StyledActionBtn onClick={() => onEdit(row)}>
                    <EditIcon />
                </StyledActionBtn>
            </TableCell>
            <TableCell align="right">
                <StyledActionBtn onClick={() => onDelete(row)}>
                    <DeleteIcon />
                </StyledActionBtn>
            </TableCell>
        </TableRow>

    )
}

export default GenericTableRow
