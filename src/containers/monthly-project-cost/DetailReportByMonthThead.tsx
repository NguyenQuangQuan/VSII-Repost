// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const DetailReportByMonthThead = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    return (
        <TableHead>
            <TableRow
                sx={{
                    '& .MuiTableCell-root': {
                        textAlign: 'center',
                        fontWeight: '700'
                    }
                }}
            >
                <TableCell
                    sx={{
                        textAlign: 'left !important',
                        left: !!matches ? 0 : 'unset',
                        zIndex: 3
                    }}
                >
                    <FormattedMessage id="project" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="department" />
                </TableCell>
                <TableCell sx={{ textAlign: 'left !important' }}>
                    <FormattedMessage id="project-type" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="total-effort-md" />
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
            </TableRow>
        </TableHead>
    );
};

export default DetailReportByMonthThead;
