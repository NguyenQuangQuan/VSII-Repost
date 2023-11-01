import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

const ProjectUserThead = () => {
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
                    <FormattedMessage id="user-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="first-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="last-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="headcount" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="from-date" />
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

export default ProjectUserThead;
