import React, { Fragment } from 'react';

// material-ui
import { TableCell, TableBody, TableRow } from '@mui/material';

// project imports
import { IMonthlyHCList } from 'types';
import { formatPrice } from 'utils/common';
import { Input, NumericFormatCustom } from 'components/extended/Form';

interface IOnGoingHCTBodyProps {
    hcInfo?: IMonthlyHCList[];
}

const OnGoingHCTBody = (props: IOnGoingHCTBodyProps) => {
    const { hcInfo } = props;
    return (
        <TableBody>
            <TableRow>
                {hcInfo?.map((item: IMonthlyHCList, key: number) => (
                    <Fragment key={key}>
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
                                name={`monthlyHCList.${key}.hcMonthly`}
                            />
                        </TableCell>
                        <TableCell>{item?.billableDay}</TableCell>
                        <TableCell>{formatPrice(item?.billable)}</TableCell>
                    </Fragment>
                ))}
            </TableRow>
        </TableBody>
    );
};

export default OnGoingHCTBody;
