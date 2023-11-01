import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

function NonBillByMemberThead() {
    const { nonBillable } = PERMISSIONS.report;

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
                <TableCell>
                    <FormattedMessage id="total-effort" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="project" />
                </TableCell>
                <TableCell sx={{ color: '#D9001B !important' }}>
                    <FormattedMessage id="not-logtime-yet" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="billable-project" />
                </TableCell>
                {checkAllowedPermission(nonBillable.commentDetail) && (
                    <TableCell>
                        <FormattedMessage id="action" />
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}
export default NonBillByMemberThead;
