// materia-ui
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';

// project imports
import { IProjectHeadCount } from 'types';
import { dateFormat } from 'utils/date';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

// third party
import { FormattedMessage } from 'react-intl';

interface IProjectUserTBodyProps {
    projectUser: IProjectHeadCount[];
    handleEdit: (user: any) => void;
    handleDelete: (user: any) => void;
}
const ProjectUserTBody = (props: IProjectUserTBodyProps) => {
    const { projectUser, handleEdit, handleDelete } = props;

    return (
        <TableBody>
            {projectUser.map((user, key) => (
                <TableRow key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.roleId}</TableCell>
                    <TableCell>{dateFormat(user.fromDate)}</TableCell>
                    <TableCell>{dateFormat(user.toDate)}</TableCell>
                    <TableCell>
                        <Stack direction="row" justifyContent="center" alignItems="center">
                            <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleEdit(user)}>
                                <IconButton aria-label="edit" size="small">
                                    <EditTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip placement="top" title={<FormattedMessage id="delete" />} onClick={() => handleDelete(user)}>
                                <IconButton aria-label="edit" size="small">
                                    <ClearSharpIcon sx={{ fontSize: '1.1rem' }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default ProjectUserTBody;
