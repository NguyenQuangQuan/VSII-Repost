import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

// project imports
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

const UserThead = () => {
    const { userPermission } = PERMISSIONS.admin;

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
                    <FormattedMessage id="table-title" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="level" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="department" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="status" />
                </TableCell>
                {checkAllowedPermission(userPermission.edit) && (
                    <TableCell align="center">
                        <FormattedMessage id="action" />
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

export default UserThead;
