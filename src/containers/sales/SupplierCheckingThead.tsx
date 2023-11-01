// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

// third party
import { FormattedMessage } from 'react-intl';

const SupplierCheckingThead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="supplier-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="technology" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="quantity" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="from-date" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="to-date" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="unit-price" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="pic-user-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="work-type" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="note" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="action" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default SupplierCheckingThead;
