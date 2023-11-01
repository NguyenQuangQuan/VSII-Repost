// material-ui
import { TableBody, TableCell, TableRow, Stack, Tooltip, IconButton } from '@mui/material';

// project imports
import { ISystemConfig } from 'types';
import { dateFormat } from 'utils/date';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// third party
import { FormattedMessage } from 'react-intl';

interface ISystemConfigTBodyProps {
    page: number;
    size: number;
    systemConfigs: ISystemConfig[];
    handleOpen: (systemConfig?: ISystemConfig) => void;
}

const SystemConfigTBody = (props: ISystemConfigTBodyProps) => {
    const { page, size, systemConfigs, handleOpen } = props;
    const { systemConfigPermission } = PERMISSIONS.admin;

    return (
        <TableBody>
            {systemConfigs.map((systemConfig: ISystemConfig, key: number) => (
                <TableRow key={key}>
                    <TableCell>{size * page + key + 1}</TableCell>
                    <TableCell>{systemConfig.key}</TableCell>
                    <TableCell>{systemConfig.value}</TableCell>
                    <TableCell>{systemConfig.note}</TableCell>
                    <TableCell>{dateFormat(systemConfig.lastUpdate)}</TableCell>
                    <TableCell>{systemConfig.userUpdate}</TableCell>
                    {checkAllowedPermission(systemConfigPermission.edit) && (
                        <TableCell>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen(systemConfig)}>
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

export default SystemConfigTBody;
