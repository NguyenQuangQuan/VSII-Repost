// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';
import { FormattedMessage } from 'react-intl';

function MonthlyCostDataThead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="project" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="project-type" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="overhead-allocated-amt" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="salary-cost" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="total-cost" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="year" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="month" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="created" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="creator" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="last-update" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="user-update" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="action" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}
export default MonthlyCostDataThead;
