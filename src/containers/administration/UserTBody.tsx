// material-ui
import { TableBody, TableCell, TableRow, Stack, Tooltip, IconButton } from '@mui/material';

// project imports
import { IMember } from 'types';
import { convertStatus } from 'utils/common';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// third party
import { FormattedMessage } from 'react-intl';

interface IUserTBodyProps {
    page: number;
    size: number;
    users: IMember[];
    handleOpen: (user?: IMember) => void;
}

const UserTBody = (props: IUserTBodyProps) => {
    const { page, size, users, handleOpen } = props;
    const { userPermission } = PERMISSIONS.admin;
    return (
        <TableBody>
            {users?.map((user: IMember, key) => (
                <TableRow key={key}>
                    <TableCell>{size * page + key + 1}</TableCell>
                    <TableCell>{user.memberCode}</TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.userRankHistoryList?.[user.userRankHistoryList.length - 1]?.titleCode}</TableCell>
                    <TableCell>{user.userRankHistoryList?.[user.userRankHistoryList.length - 1]?.rankId}</TableCell>
                    <TableCell>{user.departmentId}</TableCell>
                    <TableCell>{convertStatus(user.status)}</TableCell>
                    {checkAllowedPermission(userPermission.edit) && (
                        <TableCell>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen(user)}>
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

export default UserTBody;
