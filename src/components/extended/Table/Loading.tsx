// material-ui
import { CircularProgress, TableBody, TableCell, TableRow } from '@mui/material';

const TableLoading = () => {
    return (
        <TableBody>
            <TableRow>
                <TableCell
                    align="center"
                    colSpan={100}
                    sx={{
                        height: '200px'
                    }}
                >
                    <CircularProgress />
                </TableCell>
            </TableRow>
        </TableBody>
    );
};

export default TableLoading;
