import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

const QuotaUpdateHistoryThead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="maintain-quota" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="implement-quota" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="update-date" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default QuotaUpdateHistoryThead;
