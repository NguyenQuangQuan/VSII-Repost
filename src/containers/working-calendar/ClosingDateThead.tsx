import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow, Typography } from '@mui/material';

const ClosingDateWorkingCalendarThead = () => {
    return (
        <TableHead
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: '20',
                '& span': {
                    marginRight: '5px'
                }
            }}
        >
            <TableRow>
                <TableCell rowSpan={2}>
                    <Typography sx={{ color: '#3163D4', fontWeight: '700 !important', textAlign: 'center' }}>
                        <FormattedMessage id="year" />
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography sx={{ color: '#3163D4', fontWeight: '700 !important', textAlign: 'center' }}>
                        <FormattedMessage id="month" />
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography sx={{ color: '#3163D4', fontWeight: '700 !important', textAlign: 'center' }}>
                        <FormattedMessage id="closing-date" />
                    </Typography>
                </TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    );
};
export default ClosingDateWorkingCalendarThead;
