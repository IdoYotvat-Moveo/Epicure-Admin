import { TableCell, TableRow } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Entity, EntityType, Restaurant } from '../../data/types'
import * as utilService from '../../services/utils'
import { StyledActionBtn } from './styles'



interface GenericTableRowProps {
    row: Entity
    onEdit: (row: Entity) => void
    onDelete: (row: Entity) => void
    entity: EntityType
    isAdmin: boolean
}


const GenericTableRow = ({ row, onDelete, onEdit, entity, isAdmin }: GenericTableRowProps) => {
    let rowValues = Object.entries(row)

    if (entity === 'restaurant') {
        const orderedKeys: (keyof Restaurant)[] = ['_id', 'name', 'chef', 'image', 'rating', 'dishes', 'isPopular', 'signatureDish']
        rowValues = orderedKeys.map(key => [key, row[key as keyof Entity]])
    }

    return (
        <TableRow>
            {rowValues.map(([key, value], index) => (
                <TableCell key={index} align="left">
                    {utilService.formatValue(key, value)}
                </TableCell>
            ))}
            <TableCell align="left">
                {isAdmin && <StyledActionBtn onClick={() => onEdit(row)}>
                    <EditIcon />
                </StyledActionBtn>}
            </TableCell>
            <TableCell align="left">
                {isAdmin && <StyledActionBtn onClick={() => onDelete(row)}>
                    <DeleteIcon />
                </StyledActionBtn>}
            </TableCell>
        </TableRow>

    )
}

export default GenericTableRow
