// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';
import { FormattedMessage } from 'react-intl';

function WeeklyEffortProjectThead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="project" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="department" />
                </TableCell>
                <TableCell sx={{ fontWeight: '700 !important' }}>
                    <FormattedMessage id="total-effort" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="level0" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="level1" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="level2" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="level3" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="level4" />
                </TableCell>
                <TableCell sx={{ fontWeight: '700 !important' }}>
                    <FormattedMessage id="total-cost" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}
export default WeeklyEffortProjectThead;
