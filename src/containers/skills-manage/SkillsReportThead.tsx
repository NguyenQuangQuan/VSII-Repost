// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

// third party
import { FormattedMessage } from 'react-intl';

const SkillsReportThead = () => {
    return (
        <TableHead
            sx={{
                position: 'sticky',
                top: '0',
                zIndex: '99'
            }}
        >
            <TableRow>
                <TableCell></TableCell>
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="member-code" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="member" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="job-title" />
                </TableCell>
                <TableCell sx={{ padding: '0' }} colSpan={3}>
                    <TableRow
                        sx={{
                            display: 'table',
                            width: '100%',
                            '.MuiTableCell-root': {
                                borderBottom: 'none'
                            }
                        }}
                    >
                        <TableCell align="center" width={'33.333%'}>
                            <FormattedMessage id="skill-name" />
                        </TableCell>
                        <TableCell align="center" width={'33.333%'}>
                            <FormattedMessage id="skill-level" />
                        </TableCell>
                        <TableCell align="center" width={'33.333%'}>
                            <FormattedMessage id="skill-experience" />
                        </TableCell>
                    </TableRow>
                </TableCell>
                <TableCell>
                    <FormattedMessage id="degree" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="status" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default SkillsReportThead;
