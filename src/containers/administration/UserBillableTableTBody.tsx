import { UseFieldArrayRemove } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

// mui import
import { IconButton, Stack, TableCell, TableRow, Tooltip } from '@mui/material';

// projects import
import { DeleteTwoToneIcon } from 'assets/images/icons';
import { DatePicker } from 'components/extended/Form';

type IBillableTBodyprops = {
    index: number;
    remove: UseFieldArrayRemove;
};

const UserBillableHistoryTableTBody = (props: IBillableTBodyprops) => {
    const { index, remove } = props;

    return (
        <TableRow
            sx={{
                '& .MuiFormControl-root': { height: '50px' },
                '&.MuiTableRow-root': {
                    '& td': { borderColor: 'transparent' }
                }
            }}
        >
            <TableCell>{index + 1}</TableCell>
            <TableCell
                sx={{
                    '& .MuiFormControl-root': { marginTop: '10px' }
                }}
            >
                <DatePicker name={`userBillableHistoryList.${index}.fromDate`} />
            </TableCell>
            <TableCell
                sx={{
                    '& .MuiFormControl-root': {
                        marginTop: '10px'
                    }
                }}
            >
                <DatePicker name={`userBillableHistoryList.${index}.toDate`} />
            </TableCell>
            <TableCell>
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <Tooltip placement="top" title={<FormattedMessage id={'delete'} />} onClick={() => remove(index)}>
                        <IconButton aria-label="delete" size="small">
                            <DeleteTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </TableCell>
        </TableRow>
    );
};

export default UserBillableHistoryTableTBody;
