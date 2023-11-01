// material-ui
import { IconButton, TableCell, TableRow } from '@mui/material';

// project imports
import InputTable from './InputTable';

// assets
import { DeleteTwoToneIcon } from 'assets/images/icons';

interface IFieldsCoursesAttendedProps {
    index: number;
    handleRemove: (index: number, idHexString?: string | null) => void;
    idHexString?: string | null;
}

const FieldsCoursesAttended = (props: IFieldsCoursesAttendedProps) => {
    const { index, handleRemove, idHexString } = props;

    return (
        <TableRow sx={{ position: 'relative' }}>
            <TableCell className="from-to-date-col vertical-align-top">
                <InputTable name={`coursesAttended.${index}.fromDate`} placeholder="Fill from" label="From" required />
                <InputTable name={`coursesAttended.${index}.toDate`} placeholder="Fill to" label="To" required />
            </TableCell>
            <TableCell className="vertical-align-top">
                <InputTable name={`coursesAttended.${index}.schoolCollege`} label="School/College" required />
                <InputTable name={`coursesAttended.${index}.name`} label="Course name" />
                <InputTable name={`coursesAttended.${index}.qualification`} placeholder="Enter" label="Qualifications" />
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

export default FieldsCoursesAttended;
