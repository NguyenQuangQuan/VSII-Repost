import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

const ProjectHeadCountThead = () => {
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
                    <FormattedMessage id="full-name" />
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
            </TableRow>
        </TableHead>
    );
};

export default ProjectHeadCountThead;
