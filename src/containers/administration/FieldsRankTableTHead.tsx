import { FormattedMessage } from 'react-intl';

// mui import
import { TableCell, TableHead, TableRow } from '@mui/material';

const FieldRankHistoryTableTHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="rank-user" />
                    <span className="MuiInputLabel-asterisk"> *</span>
                </TableCell>
                <TableCell>
                    <FormattedMessage id="title-user" />
                    <span className="MuiInputLabel-asterisk"> *</span>
                </TableCell>
                <TableCell>
                    <FormattedMessage id="from-date" />
                    <span className="MuiInputLabel-asterisk"> *</span>
                </TableCell>
                <TableCell>
                    <FormattedMessage id="to-date" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="action" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default FieldRankHistoryTableTHead;
