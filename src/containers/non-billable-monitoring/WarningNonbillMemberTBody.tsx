// materia-ui
import { TableBody, TableCell, TableRow } from '@mui/material';

// project imports
import { IWarningNonbillMember } from 'types';

interface WarningNonbillMemberTbodyProps {
    data: IWarningNonbillMember[];
}

const WarningNonbillMemberTBody = (props: WarningNonbillMemberTbodyProps) => {
    const { data } = props;
    return (
        <TableBody>
            {data.map((item, key) => (
                <TableRow key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>{item.memberCode}</TableCell>
                    <TableCell>{item.userName}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.dept}</TableCell>
                    <TableCell align="center">{item.consecutiveWeek}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default WarningNonbillMemberTBody;
