// material-ui
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';

// product imports
import { PERMISSIONS } from 'constants/Permission';
import { IRank } from 'types';
import { checkAllowedPermission } from 'utils/authorization';
import { dateFormat } from 'utils/date';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { FormattedMessage } from 'react-intl';

interface IManageRankTBodyProps {
    pageNumber: number;
    pageSize: number;
    ranks: IRank[];
    handleOpen: (rank?: IRank) => void;
}

const ManageRankTBody = (props: IManageRankTBodyProps) => {
    const { pageNumber, pageSize, ranks, handleOpen } = props;
    const { rankPermission } = PERMISSIONS.admin;

    return (
        <TableBody>
            {ranks?.map((rank: IRank, key: number) => (
                <TableRow key={key}>
                    <TableCell>{pageSize * pageNumber + key + 1}</TableCell>
                    <TableCell>{rank.rankName}</TableCell>
                    <TableCell>{dateFormat(rank.lastUpdate!)}</TableCell>
                    <TableCell>{rank.userUpdate}</TableCell>
                    {checkAllowedPermission(rankPermission.edit) && (
                        <TableCell>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Tooltip placement="top" title={<FormattedMessage id={'edit'} />} onClick={() => handleOpen(rank)}>
                                    <IconButton aria-label="edit" size="small">
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

export default ManageRankTBody;
