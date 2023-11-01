// material-ui
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';

// project imports
import { IGroupItem } from 'types';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// third party
import { FormattedMessage } from 'react-intl';

interface IManageGroupTBodyProps {
    pageNumber: number;
    pageSize: number;
    groups: IGroupItem[];
    handleOpen: (group?: IGroupItem) => void;
}

const ManageGroupTBody = (props: IManageGroupTBodyProps) => {
    const { pageNumber, pageSize, groups, handleOpen } = props;
    const { groupPermission } = PERMISSIONS.admin;

    return (
        <TableBody>
            {groups.map((group, key) => (
                <TableRow key={key}>
                    <TableCell>{pageSize * pageNumber + key + 1}</TableCell>
                    <TableCell>{group.groupId}</TableCell>
                    <TableCell>{group.groupName}</TableCell>
                    <TableCell>{group?.groupType}</TableCell>
                    <TableCell>{group.note}</TableCell>
                    {checkAllowedPermission(groupPermission.edit) && (
                        <TableCell>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen(group)}>
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

export default ManageGroupTBody;
