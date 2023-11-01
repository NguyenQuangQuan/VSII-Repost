import { FormattedMessage } from 'react-intl';

// mui import
import { TableCell, TableHead, TableRow } from '@mui/material';

const UserBillableTableTHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="from-date" />
                    <span className="MuiInputLabel-asterisk"> *</span>
                </TableCell>
                <TableCell>
                    <FormattedMessage id="to-date" />
                    <span className="MuiInputLabel-asterisk"> *</span>
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="action" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default UserBillableTableTHead;
