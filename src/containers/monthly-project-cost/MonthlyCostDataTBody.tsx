// materia-ui
import { TableBody, TableCell, TableRow, Stack, Tooltip, IconButton } from '@mui/material';

// project imports
import { IMonthlyCostData } from 'types';
import { formatPrice } from 'utils/common';
import { dateFormat } from 'utils/date';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

// third party
import { FormattedMessage } from 'react-intl';

interface IMonthlyEffortProjectTBodyProps {
    data: IMonthlyCostData[];
    handleOpen: (actualCost?: IMonthlyCostData) => void;
    handleOpenDelete: (actualCost: IMonthlyCostData, type?: string) => void;
}

const MonthlyCostDataTBody = (props: IMonthlyEffortProjectTBodyProps) => {
    const { data, handleOpen, handleOpenDelete } = props;

    return (
        <TableBody>
            {data.map((item, key) => (
                <TableRow key={key}>
                    <TableCell>{item.projectName}</TableCell>
                    <TableCell>{item.projectType}</TableCell>
                    <TableCell>{formatPrice(item.allocatedAmount)}</TableCell>
                    <TableCell>{formatPrice(item.actualCost)}</TableCell>
                    <TableCell>{formatPrice(item.totalCost)}</TableCell>
                    <TableCell>{item.year}</TableCell>
                    <TableCell>{item.month}</TableCell>
                    <TableCell>{item.createDate && dateFormat(item.createDate)}</TableCell>
                    <TableCell>{item.userCreate}</TableCell>
                    <TableCell>{item.lastUpdate && dateFormat(item.lastUpdate)}</TableCell>
                    <TableCell>{item.userUpdate}</TableCell>
                    <TableCell>
                        <Stack direction="row" justifyContent="center" alignItems="center">
                            <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen(item)}>
                                <IconButton aria-label="delete" size="small">
                                    <EditTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip placement="top" title="Delete" onClick={() => handleOpenDelete(item, 'delete')}>
                                <IconButton aria-label="delete" size="small">
                                    <ClearSharpIcon sx={{ fontSize: '1.1rem' }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default MonthlyCostDataTBody;
