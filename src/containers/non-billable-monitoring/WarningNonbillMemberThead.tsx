import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

function WarningNonbillMemberThead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="member-code" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="member" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="table-title" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="department" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="consecutive-week" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}
export default WarningNonbillMemberThead;
