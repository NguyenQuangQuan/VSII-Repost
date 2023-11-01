// material-ui
import { IconButton, TableCell, TableRow } from '@mui/material';

// project imports
import InputTable from './InputTable';

// assets
import { DeleteTwoToneIcon } from 'assets/images/icons';

interface IFieldsCertificatesProps {
    index: number;
    handleRemove: (index: number, idHexString?: string | null) => void;
    idHexString?: string | null;
}

const FieldsCertificates = (props: IFieldsCertificatesProps) => {
    const { index, handleRemove, idHexString } = props;

    return (
        <TableRow sx={{ position: 'relative' }}>
            <TableCell className="from-to-date-col vertical-align-top">
                <InputTable name={`certificates.${index}.fromDate`} placeholder="Fill from" label="From" required />
                <InputTable name={`certificates.${index}.toDate`} placeholder="Fill to" label="To" required />
            </TableCell>
            <TableCell className="vertical-align-top">
                <InputTable name={`certificates.${index}.organization`} label="Organization" required />
                <InputTable name={`certificates.${index}.name`} label="Certificate Name" />
                <InputTable name={`certificates.${index}.qualification`} label="Qualifications" />
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

export default FieldsCertificates;
