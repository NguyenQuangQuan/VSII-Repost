// material-ui
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';

// project imports
import { IProject } from 'types';
import { dateFormat } from 'utils/date';
import { STATUS_PROJECT } from 'constants/Common';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// third party
import { FormattedMessage } from 'react-intl';

interface IManageProjectTBodyProps {
    pageNumber: number;
    pageSize: number;
    projects: IProject[];
    handleOpen: (project?: IProject) => void;
}

const ManageProjectTBody = (props: IManageProjectTBodyProps) => {
    const { pageNumber, pageSize, projects, handleOpen } = props;
    const { projectPermission } = PERMISSIONS.admin;

    return (
        <TableBody>
            {projects.map((project, key) => (
                <TableRow key={key}>
                    <TableCell>{pageSize * pageNumber + key + 1}</TableCell>
                    <TableCell>{project.projectName}</TableCell>
                    <TableCell>
                        {project.projectManager !== null ? `${project.projectManager?.firstName} ${project.projectManager?.lastName}` : ''}
                    </TableCell>
                    <TableCell>{project.billable}</TableCell>
                    <TableCell>{project.type}</TableCell>
                    <TableCell>{dateFormat(project.startDate)}</TableCell>
                    <TableCell>{STATUS_PROJECT[project.projectStatus]}</TableCell>
                    {checkAllowedPermission(projectPermission.edit) && (
                        <TableCell>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen(project)}>
                                    <IconButton aria-label="delete" size="small">
                                        <EditTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </TableCell>
                    )}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default ManageProjectTBody;
