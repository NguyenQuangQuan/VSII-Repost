// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const MonthlyEffortProjectThead = () => {
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
            </TableRow>
        </TableHead>
    );
};

export default MonthlyEffortProjectThead;
