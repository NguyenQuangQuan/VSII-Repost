// material-ui
import { TableCell, TableBody, Stack, Tooltip, IconButton } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// project imports
import { Input, NumericFormatCustom } from 'components/extended/Form';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { formatPrice } from 'utils/common';

interface IBiddingHCTBodyProps {
    monthlyHCList?: any;
    handleOpen: () => void;
    onChange?: () => void;
    contractTypeValue?: string;
}

const BiddingHCTBody = (props: IBiddingHCTBodyProps) => {
    const { monthlyHCList, handleOpen, onChange, contractTypeValue } = props;

    return (
        <TableBody>
            {contractTypeValue && (
                <TableCell sx={{ position: 'sticky', left: 0, zIndex: 2, backgroundColor: 'white' }}>
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen()}>
                            <IconButton aria-label="edit" size="small">
                                <EditTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </TableCell>
            )}
            {monthlyHCList?.map((field: any, index: number) => (
                <React.Fragment key={field.month}>
                    <TableCell
                        sx={{
                            '& .MuiFormControl-root': {
                                width: '100px'
                            }
                        }}
                    >
                        <Input
                            textFieldProps={{
                                InputProps: {
                                    inputComponent: NumericFormatCustom as any
                                }
                            }}
                            name={`monthlyHCList.${index}.hcMonthly`}
                            onChangeInput={onChange}
                        />
                    </TableCell>
                    <TableCell>{formatPrice(monthlyHCList[index].billableDay)}</TableCell>
                    <TableCell>{formatPrice(monthlyHCList[index].billable)}</TableCell>
                </React.Fragment>
            ))}
        </TableBody>
    );
};

export default BiddingHCTBody;
