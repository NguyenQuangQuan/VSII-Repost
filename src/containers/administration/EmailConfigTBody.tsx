import { Fragment } from 'react';
// material-ui
import { TableBody, TableCell, TableRow, Stack, Tooltip, IconButton } from '@mui/material';

// project imports
import { IEmailConfig } from 'types';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// third party
import { FormattedMessage } from 'react-intl';

interface IEmailConfigTBodyProps {
    emailConfigs: IEmailConfig[];
    handleOpen: (emailConfig?: IEmailConfig) => void;
}

const EmailConfigTBody = (props: IEmailConfigTBodyProps) => {
    const { emailConfigs, handleOpen } = props;
    const { emailConfigPermission } = PERMISSIONS.admin;

    return (
        <TableBody>
            {emailConfigs.map((emailConfig: IEmailConfig, key: number) => (
                <TableRow key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>{emailConfig.emailCode}</TableCell>
                    <TableCell>
                        {emailConfig?.sendTo?.map((mail, index) => (
                            <Fragment key={index}>
                                {mail}
                                <br />
                            </Fragment>
                        ))}
                    </TableCell>
                    <TableCell>
                        {emailConfig?.sendCC?.map((mail, index) => (
                            <Fragment key={index}>
                                {mail}
                                <br />
                            </Fragment>
                        ))}
                    </TableCell>
                    <TableCell>
                        {emailConfig?.sendBCC?.map((mail, index) => (
                            <Fragment key={index}>
                                {mail}
                                <br />
                            </Fragment>
                        ))}
                    </TableCell>
                    {checkAllowedPermission(emailConfigPermission.edit) && (
                        <TableCell>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen(emailConfig)}>
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

export default EmailConfigTBody;
