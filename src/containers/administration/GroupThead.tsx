// third party
import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

// project imports
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

const ManageGroupThead = () => {
    const { groupPermission } = PERMISSIONS.admin;

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="group-code" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="group-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="group-type" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="note" />
                </TableCell>
                {checkAllowedPermission(groupPermission.edit) && (
                    <TableCell align="center">
                        <FormattedMessage id="action" />
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

export default ManageGroupThead;
