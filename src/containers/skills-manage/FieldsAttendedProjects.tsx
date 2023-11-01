// material-ui
import { IconButton, TableCell, TableRow } from '@mui/material';

// project imports
import InputTable from './InputTable';

// assets
import { DeleteTwoToneIcon } from 'assets/images/icons';

interface IFieldsAttendedProjectsProps {
    index: number;
    handleRemove: (index: number, idHexString?: string | null) => void;
    idHexString?: string | null;
}

const FieldsAttendedProjects = (props: IFieldsAttendedProjectsProps) => {
    const { index, handleRemove, idHexString } = props;

    return (
        <>
            <TableRow>
                <TableCell className="from-to-date-col vertical-align-top" rowSpan={9}>
                    <InputTable name={`attendedProjects.${index}.fromDate`} placeholder="Fill from" label="From" required />
                    <InputTable name={`attendedProjects.${index}.toDate`} placeholder="Fill to" label="To" required />
                </TableCell>
                <TableCell className="personal-detail-2rd-col vertical-align-top">Project name:</TableCell>
                <TableCell>
                    <InputTable name={`attendedProjects.${index}.projectName`} textFieldProps={{ multiline: true }} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col vertical-align-top">Company:</TableCell>
                <TableCell>
                    <InputTable name={`attendedProjects.${index}.company`} textFieldProps={{ multiline: true }} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col vertical-align-top">Client:</TableCell>
                <TableCell>
                    <InputTable name={`attendedProjects.${index}.client`} textFieldProps={{ multiline: true }} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col vertical-align-top">Project size:</TableCell>
                <TableCell>
                    <InputTable name={`attendedProjects.${index}.projectSize`} textFieldProps={{ multiline: true }} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col vertical-align-top">Position:</TableCell>
                <TableCell>
                    <InputTable name={`attendedProjects.${index}.position`} textFieldProps={{ multiline: true }} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col vertical-align-top">Responsibilities:</TableCell>
                <TableCell>
                    <InputTable name={`attendedProjects.${index}.responsibilities`} textFieldProps={{ multiline: true }} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col vertical-align-top">Project description:</TableCell>
                <TableCell>
                    <InputTable name={`attendedProjects.${index}.description`} textFieldProps={{ multiline: true }} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col vertical-align-top">Used progamming languages:</TableCell>
                <TableCell>
                    <InputTable name={`attendedProjects.${index}.languages`} textFieldProps={{ multiline: true }} />
                </TableCell>
            </TableRow>
            <TableRow sx={{ position: 'relative' }}>
                <TableCell className="personal-detail-2rd-col vertical-align-top">Used technologies:</TableCell>
                <TableCell>
                    <InputTable name={`attendedProjects.${index}.technologies`} textFieldProps={{ multiline: true }} />
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: '-50px',
                            transform: 'translateY(-50%)'
                        }}
                        size="small"
                        onClick={() => handleRemove(index, idHexString)}
                    >
                        <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
};

export default FieldsAttendedProjects;
