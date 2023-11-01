import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

const RatioJoiningProjectThead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="id" />
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
                    <FormattedMessage id="joining-project" />
                </TableCell>
                {/* <TableCell align="center">
                    <FormattedMessage id="no-logtime" />
                </TableCell> */}
            </TableRow>
        </TableHead>
    );
};

export default RatioJoiningProjectThead;
