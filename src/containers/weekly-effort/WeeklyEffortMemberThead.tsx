// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';
import { FormattedMessage } from 'react-intl';

function WeeklyEffortMemberThead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="member" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="member-code" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="level" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="department" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="effort-in-week" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="difference-hours" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="project" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}
export default WeeklyEffortMemberThead;
