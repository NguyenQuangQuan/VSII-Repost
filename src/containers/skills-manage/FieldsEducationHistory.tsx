// material-ui
import { IconButton, TableCell, TableRow } from '@mui/material';

// project imports
import InputTable from './InputTable';

// assets
import { DeleteTwoToneIcon } from 'assets/images/icons';

interface IFieldsEducationHistoryProps {
    index: number;
    handleRemove: (index: number, idHexString?: string | null) => void;
    idHexString?: string | null;
}

const FieldsEducationHistory = (props: IFieldsEducationHistoryProps) => {
    const { index, handleRemove, idHexString } = props;

    return (
        <TableRow key={index} sx={{ position: 'relative' }}>
            <TableCell className="from-to-date-col vertical-align-top">
                <InputTable name={`educationHistory.${index}.fromDate`} placeholder="Fill from" label="From" required />
                <InputTable name={`educationHistory.${index}.toDate`} placeholder="Fill to" label="To" required />
            </TableCell>
            <TableCell className="vertical-align-top">
                <InputTable name={`educationHistory.${index}.school`} label="University/School" required />
                <InputTable name={`educationHistory.${index}.qualification`} placeholder="Enter" label="Degree/Qualifications" />
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

export default FieldsEducationHistory;
