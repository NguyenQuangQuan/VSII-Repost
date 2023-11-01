import { FormattedMessage } from 'react-intl';
import { TableCell, TableHead, TableRow, styled } from '@mui/material';

interface IMonthlyBillableTheadProps {
    dataArray?: any;
}

const RedAsterisk = styled('span')({
    color: 'red',
    paddingLeft: '4px'
});

const MonthlyBillableThead = (props: IMonthlyBillableTheadProps) => {
    const { dataArray } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell align="center">
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="role" />
                    {dataArray?.length > 0 && <RedAsterisk>*</RedAsterisk>}
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="rate" />
                    {dataArray?.length > 0 && <RedAsterisk>*</RedAsterisk>}
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="rate-vnd" />
                    {dataArray?.length > 0 && <RedAsterisk>*</RedAsterisk>}
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="quantity" />
                    {dataArray?.length > 0 && <RedAsterisk>*</RedAsterisk>}
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="amount" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="action" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default MonthlyBillableThead;
