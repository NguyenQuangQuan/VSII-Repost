// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

const ErrorMessageThead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Label</TableCell>
                <TableCell>Message</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default ErrorMessageThead;
