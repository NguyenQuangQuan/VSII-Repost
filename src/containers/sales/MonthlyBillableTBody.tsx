import { FormattedMessage } from 'react-intl';

// mui import
import { IconButton, Stack, TableCell, TableRow, Tooltip } from '@mui/material';

// projects import
import { DeleteTwoToneIcon } from 'assets/images/icons';
import { Role } from 'containers/search';
import { Input, NumericFormatCustom } from 'components/extended/Form';
import { formatPrice } from 'utils/common';
import { IProductivityHcInfo } from 'types';

type IMonthlyBillableTBodyprops = {
    item: IProductivityHcInfo;
    index: number;
    remove: (index: number) => void;
    handleChangeRate: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    handleChangeRateVND: (e: any) => void;
    handleChangeQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const MonthlyBillableTBody = (props: IMonthlyBillableTBodyprops) => {
    const { index, item, remove, handleChangeRate, handleChangeQuantity, handleChangeRateVND } = props;

    return (
        <>
            <TableRow
                sx={{
                    '& .MuiFormControl-root': { height: '50px' },
                    '&.MuiTableRow-root': {
                        '& td': {
                            borderColor: 'transparent',
                            '&.MuiTableCell-root:nth-of-type(2) .MuiFormHelperText-root': {
                                position: 'absolute'
                            }
                        }
                    }
                }}
            >
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{ '& .MuiInputBase-root': { width: '110px' } }}>
                    <Role isShowName={`rateByMonth.${index}.role`} isShowLabel={true} />
                </TableCell>
                <TableCell sx={{ '& .MuiFormControl-root': { marginTop: '10px' } }}>
                    <Input
                        textFieldProps={{
                            InputProps: {
                                inputComponent: NumericFormatCustom as any
                            }
                        }}
                        name={`rateByMonth.${index}.rate`}
                        onChangeInput={(e) => handleChangeRate(e, index)}
                    />
                </TableCell>
                <TableCell sx={{ '& .MuiFormControl-root': { marginTop: '10px' } }}>
                    <Input
                        textFieldProps={{
                            InputProps: {
                                inputComponent: NumericFormatCustom as any
                            }
                        }}
                        disabled
                        name={`rateByMonth.${index}.rateVND`}
                        onChangeInput={(e) => handleChangeRateVND(e)}
                    />
                </TableCell>
                <TableCell sx={{ '& .MuiFormControl-root': { marginTop: '10px' } }}>
                    <Input
                        textFieldProps={{
                            InputProps: {
                                inputComponent: NumericFormatCustom as any
                            }
                        }}
                        name={`rateByMonth.${index}.quantity`}
                        onChangeInput={(e) => handleChangeQuantity(e)}
                    />
                </TableCell>
                <TableCell>{formatPrice(item.amount)}</TableCell>
                <TableCell>
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Tooltip placement="top" title={<FormattedMessage id="delete" />} onClick={() => remove(index)}>
                            <IconButton aria-label="delete" size="small">
                                <DeleteTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </TableCell>
            </TableRow>
        </>
    );
};

export default MonthlyBillableTBody;
