import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

const AssignedUserThead = () => {
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
                    <FormattedMessage id="user-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="first-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="last-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="location" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default AssignedUserThead;
