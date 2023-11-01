import { UseFieldArrayRemove } from 'react-hook-form';

// mui
import { IconButton, Stack, TableCell, TableRow, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

//projec import
import { DatePicker, Input, NumericFormatCustom } from 'components/extended/Form';
import { MONEY_PLACEHOLDER } from 'constants/Common';
import { DeleteTwoToneIcon } from 'assets/images/icons';
import { FormattedMessage } from 'react-intl';

type IRankCostHistoryTBodyProps = {
    index: number;
    remove: UseFieldArrayRemove;
    count: number;
};
const RankCostHistoryTBody = (props: IRankCostHistoryTBodyProps) => {
    const { index, remove, count } = props;
    const theme = useTheme();

    return (
        <TableRow
            sx={{
                '& .MuiFormControl-root': { height: '50px' },
                '&.MuiTableRow-root': {
                    '& td': { borderColor: 'transparent' },
                    '& .MuiInputBase-input': {
                        [theme.breakpoints.down('sm')]: {
                            width: 'unset !important'
                        }
                    }
                }
            }}
        >
            <TableCell
                sx={{
                    '& .MuiTableCell-root': { marginBottom: '50px' }
                }}
            >
                {index + 1}
            </TableCell>
            <TableCell>
                <Input
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                    name={`rankCostHistoryList.${index}.amount`}
                />
            </TableCell>
            <TableCell>
                <DatePicker name={`rankCostHistoryList.${index}.fromDate`} />
            </TableCell>
            <TableCell>
                <DatePicker name={`rankCostHistoryList.${index}.toDate`} />
            </TableCell>
            <TableCell
                sx={{
                    '& .MuiStack-root': {
                        marginBottom: '20px'
                    }
                }}
            >
                {count && count > 1 && (
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Tooltip placement="top" title={<FormattedMessage id={'delete'} />} onClick={() => index > 0 && remove(index)}>
                            <IconButton aria-label="delete" size="small">
                                <DeleteTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )}
            </TableCell>
        </TableRow>
    );
};

export default RankCostHistoryTBody;
