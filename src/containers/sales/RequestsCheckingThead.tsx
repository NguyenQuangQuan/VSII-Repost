// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

// third party
import { FormattedMessage } from 'react-intl';

const RequestsCheckingThead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="partner-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="received-date" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="request" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="technology" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="quantity" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="timeline" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="pic-user-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="status" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="possibility" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="domain" />
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

export default RequestsCheckingThead;
