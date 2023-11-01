// material-ui
import { TableBody, TableCell, TableRow } from '@mui/material';

import InputTable from './InputTable';
// project imports

const SummaryInformationTBody = () => {
    return (
        <TableBody>
            <TableRow>
                <TableCell>
                    <InputTable name="personalDetail.summaryInformation" placeholder="Fill summary" textFieldProps={{ multiline: true }} />
                </TableCell>
            </TableRow>
        </TableBody>
    );
};

export default SummaryInformationTBody;
