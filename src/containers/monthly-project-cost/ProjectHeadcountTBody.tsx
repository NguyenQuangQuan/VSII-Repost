// materia-ui
import { TableBody, TableCell, TableRow } from '@mui/material';

// project imports
import { IProjectHeadCount } from 'types';
import { dateFormat } from 'utils/date';

interface IProjectHeadCountTBodyProps {
    headCounts: IProjectHeadCount[];
}
const ProjectHeadCountTBody = (props: IProjectHeadCountTBodyProps) => {
    const { headCounts } = props;

    return (
        <TableBody>
            {headCounts.map((user: IProjectHeadCount, key: number) => (
                <TableRow key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>{user.memberCode}</TableCell>
                    <TableCell>
                        {user.firstName}
                        {''} {user.lastName}
                    </TableCell>
                    <TableCell>{user.roleId}</TableCell>
                    <TableCell>{dateFormat(user.fromDate)}</TableCell>
                    <TableCell>{dateFormat(user.toDate)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default ProjectHeadCountTBody;
