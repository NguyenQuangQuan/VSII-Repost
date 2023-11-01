import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

//project imports
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

const SystemConfigThead = () => {
    const { systemConfigPermission } = PERMISSIONS.admin;

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="key" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="value" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="note" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="last-update" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="user-update" />
                </TableCell>
                {checkAllowedPermission(systemConfigPermission.edit) && (
                    <TableCell align="center">
                        <FormattedMessage id="action" />
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

export default SystemConfigThead;
