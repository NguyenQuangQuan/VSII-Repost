// material-ui
import { IconButton, TableCell, TableRow } from '@mui/material';

// project imports
import InputTable from './InputTable';

// assets
import { DeleteTwoToneIcon } from 'assets/images/icons';

interface IFieldsEmploymentsHistoryProps {
    index: number;
    handleRemove: (index: number, idHexString?: string | null) => void;
    idHexString?: string | null;
}

const FieldsEmploymentsHistory = (props: IFieldsEmploymentsHistoryProps) => {
    const { index, handleRemove, idHexString } = props;

    return (
        <TableRow sx={{ position: 'relative' }}>
            <TableCell className="from-to-date-col vertical-align-top">
                <InputTable name={`employmentsHistory.${index}.fromDate`} placeholder="Fill from" label="From" required />
                <InputTable name={`employmentsHistory.${index}.toDate`} placeholder="Fill to" label="To" />
            </TableCell>
            <TableCell className="vertical-align-top">
                <InputTable name={`employmentsHistory.${index}.company`} label="Company" required />
                <InputTable name={`employmentsHistory.${index}.jobTitle`} label="Job title" />
                <InputTable
                    name={`employmentsHistory.${index}.jobDescription`}
                    label="Job description"
                    textFieldProps={{ multiline: true }}
                />
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '-50px',
                        transform: 'translateY(-50%)'
                    }}
                    onClick={() => handleRemove(index, idHexString)}
                >
                    <DeleteTwoToneIcon fontSize="small" />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default FieldsEmploymentsHistory;
