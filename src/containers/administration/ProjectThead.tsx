import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

// project imports
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

const ManageProjectThead = () => {
    const { projectPermission } = PERMISSIONS.admin;

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="project-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="project-manager" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="billable" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="project-type" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="start-date" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="status" />
                </TableCell>
                {checkAllowedPermission(projectPermission.edit) && (
                    <TableCell align="center">
                        <FormattedMessage id="action" />
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

export default ManageProjectThead;
