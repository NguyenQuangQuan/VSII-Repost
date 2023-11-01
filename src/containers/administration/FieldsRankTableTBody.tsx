/* eslint-disable prettier/prettier */
import { FormattedMessage } from 'react-intl';

// mui import
import { IconButton, Stack, TableCell, TableRow, Tooltip } from '@mui/material';

// projects import
import { DeleteTwoToneIcon } from 'assets/images/icons';
import { DatePicker } from 'components/extended/Form';
import { Level, Title } from 'containers/search';

type IFieldsRankHistoryTableTBodyprops = {
    index: number;
    remove: (index: number) => void;
    count?: number;
};

const FieldsRankHistoryTableTBody = (props: IFieldsRankHistoryTableTBodyprops) => {
    const { index, remove, count } = props;
    return (
        <TableRow
            sx={{
                '& .MuiFormControl-root': { height: '50px' },
                '&.MuiTableRow-root': {
                    '& td': {
                        borderColor: 'transparent',
                        '&.MuiTableCell-root:nth-of-type(2) .MuiFormHelperText-root, &.MuiTableCell-root:nth-of-type(3) .MuiFormHelperText-root':
                            {
                                position: 'absolute'
                            }
                    }
                }
            }}
        >
            <TableCell>{index + 1}</TableCell>
            <TableCell sx={{ '& .MuiInputBase-root': { width: '100px' } }}>
                <Level isShowLabel={true} name={`userRankHistoryList.${index}.rankId`} isShowAll={false} />
            </TableCell>
            <TableCell sx={{ '& .MuiInputBase-root': { width: '240px' } }}>
                <Title isShowLabel={true} name={`userRankHistoryList.${index}.titleCode`} isShowAll={false} />
            </TableCell>
            <TableCell sx={{ '& .MuiFormControl-root': { marginTop: '10px', width: '145px' } }}>
                <DatePicker name={`userRankHistoryList.${index}.fromDate`} />
            </TableCell>
            <TableCell sx={{ '& .MuiFormControl-root': { marginTop: '10px', width: '145px' } }}>
                <DatePicker name={`userRankHistoryList.${index}.toDate`} />
            </TableCell>
            <TableCell>
                {count && count > 1 && (
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Tooltip placement="top" title={<FormattedMessage id={'delete'} />} onClick={() => remove(index)}>
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

export default FieldsRankHistoryTableTBody;
