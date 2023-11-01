import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

const ListProjectTeamThead = () => {
    const { listProjectTeam } = PERMISSIONS.report;

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
                <TableCell align="center">
                    <FormattedMessage id="department" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="main-headcount" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="secondary-headcount" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="project-nonbillable" />
                </TableCell>
                {checkAllowedPermission(listProjectTeam.commentDetail) && (
                    <TableCell>
                        <FormattedMessage id="action" />
                    </TableCell>
                )}
                {/* <TableCell align="center">
                    <FormattedMessage id="no-logtime" />
                </TableCell> */}
            </TableRow>
        </TableHead>
    );
};

export default ListProjectTeamThead;
