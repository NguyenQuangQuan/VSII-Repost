// material-ui
import { TableBody, TableCell, TableRow } from '@mui/material';

// react=hook-form
import { useFormContext } from 'react-hook-form';

// project imnports
import { cvDefaultValues } from 'pages/skills-manage/Config';
import InputTable from './InputTable';
import References from './References';

const ReferencesTBody = () => {
    const { setValue } = useFormContext();

    const handleChange = (memberInfo: any) => {
        setValue('references', memberInfo ? memberInfo : cvDefaultValues.references);
    };

    return (
        <TableBody>
            <TableRow>
                <TableCell rowSpan={6} className="personal-detail-1st-col vertical-align-top">
                    <References name="personalDetail.referenceIdHexString" isDefaultAll handleChange={handleChange} />
                </TableCell>
                <TableCell className="personal-detail-2rd-col">Fullname</TableCell>
                <TableCell>
                    <InputTable name="references.fullName" disabled />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col">Organization:</TableCell>
                <TableCell>
                    <InputTable name="references.organization" disabled />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col">Position:</TableCell>
                <TableCell>
                    <InputTable name="references.position" disabled />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col">Address:</TableCell>
                <TableCell>
                    <InputTable name="references.address" disabled />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col">Phone:</TableCell>
                <TableCell>
                    <InputTable name="references.phoneNumber" disabled />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col">Email:</TableCell>
                <TableCell>
                    <InputTable name="references.email" disabled />
                </TableCell>
            </TableRow>
        </TableBody>
    );
};

export default ReferencesTBody;
