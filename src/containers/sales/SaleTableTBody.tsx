import { FormattedMessage } from 'react-intl';

// mui import
import { IconButton, Stack, TableCell, TableRow, Tooltip } from '@mui/material';

// projects import
import { DeleteTwoToneIcon } from 'assets/images/icons';
import { Role } from 'containers/search';
import { Input, NumericFormatCustom } from 'components/extended/Form';
import { IProductivityHcInfo } from 'types';

type ISaleTableTBodyprops = {
    item: IProductivityHcInfo;
    index: number;
    remove: (index: number) => void;
};
const SaleTableTBody = (props: ISaleTableTBodyprops) => {
    const { index, remove } = props;
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
                    <Role isShowName={`hcInfo.${index}.role`} isShowLabel={true} />
                </TableCell>
                <TableCell sx={{ '& .MuiFormControl-root': { marginTop: '10px' } }}>
                    <Input
                        textFieldProps={{
                            InputProps: {
                                inputComponent: NumericFormatCustom as any
                            }
                        }}
                        name={`hcInfo.${index}.rate`}
                    />
                </TableCell>
                <TableCell sx={{ '& .MuiFormControl-root': { marginTop: '10px' } }}>
                    <Input
                        textFieldProps={{
                            InputProps: {
                                inputComponent: NumericFormatCustom as any
                            }
                        }}
                        name={`hcInfo.${index}.rateUSD`}
                    />
                </TableCell>
                <TableCell sx={{ '& .MuiFormControl-root': { marginTop: '10px' } }}>
                    <Input
                        textFieldProps={{
                            InputProps: {
                                inputComponent: NumericFormatCustom as any
                            }
                        }}
                        name={`hcInfo.${index}.quantity`}
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
                        name={`hcInfo.${index}.amount`}
                    />
                </TableCell>
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

export default SaleTableTBody;
