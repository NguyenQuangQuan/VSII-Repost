import { FormattedMessage } from 'react-intl';

//mui import
import { IconButton, Stack, TableCell, TableRow, Tooltip } from '@mui/material';

//projects import
import { DeleteTwoToneIcon } from 'assets/images/icons';
import { Checkbox, DatePicker } from 'components/extended/Form';

type IFieldsOnboardHistoryTableTBodyprops = {
    index: number;
    remove: (index: number) => void;
};

const FieldsOnboardHistoryTableTBody = (props: IFieldsOnboardHistoryTableTBodyprops) => {
    const { index, remove } = props;
    return (
        <TableRow
            sx={{
                '& .MuiFormControl-root': {
                    height: '50px',
                    borderBottom: 'none'
                },
                '&.MuiTableRow-root': {
                    '& td': {
                        borderColor: 'transparent'
                    }
                }
            }}
            className="container"
        >
            <TableCell>{index + 1}</TableCell>
            <TableCell>
                <Checkbox name={`userOnboardHistoryList.${index}.contractor`} />
            </TableCell>
            <TableCell
                sx={{
                    '& .MuiFormControl-root': {
                        marginTop: '8px',
                        borderColor: 'none'
                    }
                }}
            >
                <DatePicker name={`userOnboardHistoryList.${index}.fromDate`} />
            </TableCell>
            <TableCell
                sx={{
                    '& .MuiFormControl-root': {
                        marginTop: '8px'
                    }
                }}
            >
                <DatePicker name={`userOnboardHistoryList.${index}.toDate`} />
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

export default FieldsOnboardHistoryTableTBody;
