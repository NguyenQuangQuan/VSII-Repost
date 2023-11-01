// material-ui
import { TableBody, TableCell, TableRow } from '@mui/material';

interface ErrorMessageTBodyProps {
    errorMessages: {
        value: string;
        message: string;
    }[];
}

const ErrorMessageTBody = (props: ErrorMessageTBodyProps) => {
    const { errorMessages } = props;
    return (
        <TableBody>
            {errorMessages.map((err, key) => (
                <TableRow key={key}>
                    <TableCell align="center">{key + 1}</TableCell>
                    <TableCell align="center">{err.value}</TableCell>
                    <TableCell>{err.message}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default ErrorMessageTBody;
