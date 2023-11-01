import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

// project imports
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

const ManageRankThead = () => {
    const { rankPermission } = PERMISSIONS.admin;

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="rank-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="last-update" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="user-update" />
                </TableCell>
                {checkAllowedPermission(rankPermission.edit) && (
                    <TableCell align="center">
                        <FormattedMessage id="action" />
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

export default ManageRankThead;
