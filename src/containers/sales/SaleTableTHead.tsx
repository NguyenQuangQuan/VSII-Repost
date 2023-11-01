import { FormattedMessage } from 'react-intl';
import { TableCell, TableHead, TableRow, styled } from '@mui/material';

interface ISaleTableTHeadProps {
    dataArray?: any;
}

const RedAsterisk = styled('span')({
    color: 'red',
    paddingLeft: '4px'
});

const SaleTableTHead = (props: ISaleTableTHeadProps) => {
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
                    <FormattedMessage id="rate-usd" />
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

export default SaleTableTHead;
