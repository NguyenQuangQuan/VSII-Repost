import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

// project imports
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

const SpecialHoursThead = () => {
    const { specialHoursPermission } = PERMISSIONS.admin;

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
                    <FormattedMessage id="from-date" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="to-date" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="type" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="hours-per-day" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="note" />
                </TableCell>
                {checkAllowedPermission(specialHoursPermission.edit) && (
                    <TableCell align="center">
                        <FormattedMessage id="action" />
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

export default SpecialHoursThead;
