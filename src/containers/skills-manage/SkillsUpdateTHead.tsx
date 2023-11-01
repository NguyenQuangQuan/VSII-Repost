/* eslint-disable prettier/prettier */
// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';
import { PERMISSIONS } from 'constants/Permission';
import { FormattedMessage } from 'react-intl';

// project imports
import { checkAllowedPermission } from 'utils/authorization';

const SkillsUpdateTHead = () => {
    const { skillsUpdate } = PERMISSIONS.report.skillManage;

    return (
        <TableHead>
            <TableRow>
                <TableCell align="center">
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="member-code" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="member" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="job-title" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="department" />
                </TableCell>
                <TableCell align="center">
                    <FormattedMessage id="status" />
                </TableCell>
                {checkAllowedPermission(skillsUpdate.edit) ||
                    checkAllowedPermission(skillsUpdate.download) ||
                    checkAllowedPermission(skillsUpdate.viewCV) ? (
                    <TableCell align="center">
                        <FormattedMessage id="action" />
                    </TableCell>
                ) : (
                    <></>
                )}
            </TableRow>
        </TableHead>
    );
};

export default SkillsUpdateTHead;
