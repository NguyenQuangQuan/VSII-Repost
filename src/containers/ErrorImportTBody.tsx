import { Fragment } from 'react';

// material-ui
import { TableBody, TableCell, TableRow } from '@mui/material';

import { IImportError } from './ManualSyncDialog';

interface ErrorImportTBodyProps {
    errorMessages: IImportError[];
}

const ErrorImportTBody = (props: ErrorImportTBodyProps) => {
    const { errorMessages } = props;
    return (
        <TableBody>
            {errorMessages.map((err: IImportError, key: number) => (
                <Fragment key={key}>
                    <TableRow style={{ backgroundColor: 'rgb(240 240 240)' }}>
                        <TableCell colSpan={4}>{err.name}</TableCell>
                    </TableRow>
                    {err.errorList.map((subErr: string, subKey: number) => (
                        <TableRow key={subKey}>
                            <TableCell></TableCell>
                            <TableCell>{subErr}</TableCell>
                        </TableRow>
                    ))}
                </Fragment>
            ))}
        </TableBody>
    );
};

export default ErrorImportTBody;
