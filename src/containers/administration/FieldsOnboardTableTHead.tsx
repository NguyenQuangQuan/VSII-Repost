import { FormattedMessage } from 'react-intl';

//mui import
import { TableCell, TableHead, TableRow } from '@mui/material';

const FieldsOnboardHistoryTableTHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="contractor" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="onboard-date" />
                    <span className="MuiInputLabel-asterisk"> *</span>
                </TableCell>
                <TableCell>
                    <FormattedMessage id="outboard-date" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="action" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default FieldsOnboardHistoryTableTHead;
