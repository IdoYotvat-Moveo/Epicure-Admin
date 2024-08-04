// import { Key } from '@mui/icons-material';
import { TableCell, TableRow } from '@mui/material';
import { Chef, Dish, Restaurant } from '../../data/types';
import * as utilService from '../../services/utils';

type Entity = Chef | Dish | Restaurant;

interface GenericTableRowProps {
  row: Entity;
}

const GenericTableRow = ({ row }: GenericTableRowProps) => {
    const rowValues = Object.entries(row);

    return (
        <TableRow>
            {rowValues.map(([key, value], index) => (
                <TableCell key={index} align="right">
                    {utilService.formatValue(key, value)}
                </TableCell>
            ))}
        </TableRow>
    )
}

export default GenericTableRow
