// materia-ui
import { TableBody, TableCell, TableRow } from '@mui/material';

// project imports
import { IAssignedUser } from 'types';

interface IAssignedUserTBodyProps {
    assignedUser: IAssignedUser[];
}
const AssignedUserTBody = (props: IAssignedUserTBodyProps) => {
    const { assignedUser } = props;

    return (
        <TableBody>
            {assignedUser.map((user: IAssignedUser, key: number) => (
                <TableRow key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>{user.memberCode}</TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.title}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default AssignedUserTBody;
