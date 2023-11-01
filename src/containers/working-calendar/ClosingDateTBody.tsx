import { FormattedMessage } from 'react-intl';

// material-ui
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { IconButton, Stack, TableCell, TableRow, Tooltip } from '@mui/material';

// project imports
import { IClosingDate, IClosingDateType } from 'types/working-calendar';
import { dateFormat } from 'utils/date';

interface ClosingDateProp {
    data: IClosingDate;
    loading?: boolean;
    handleOpen: (closingDates?: IClosingDateType) => void;
}

const ClosingDateTBody = (props: ClosingDateProp) => {
    const { data, handleOpen } = props;
    const { closingDates } = data;

    return (
        <>
            {closingDates.map((item: IClosingDateType, index: number) => (
                <TableRow key={index}>
                    <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>
                        {data.year}
                    </TableCell>
                    <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>
                        {item.month}
                    </TableCell>
                    <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>
                        {dateFormat(item.closingDate)}
                    </TableCell>
                    <TableCell>
                        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ textAlign: 'center' }}>
                            <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen(item)}>
                                <IconButton aria-label="edit" size="small">
                                    <EditTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default ClosingDateTBody;
