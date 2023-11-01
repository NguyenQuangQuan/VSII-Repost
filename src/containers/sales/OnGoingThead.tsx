// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

// project imports
import { PERMISSIONS } from 'constants/Permission';
import { checkAllowedPermission } from 'utils/authorization';

// third party
import { FormattedMessage } from 'react-intl';

const OnGoingThead = () => {
    const { onGoingPermission } = PERMISSIONS.sale.salePipeline;

    return (
        <TableHead>
            <TableRow>
                {checkAllowedPermission(onGoingPermission.delete) || checkAllowedPermission(onGoingPermission.edit) ? (
                    <TableCell align="center" sx={{ position: 'sticky', left: 0, zIndex: 3, backgroundColor: 'white' }}>
                        <FormattedMessage id="action" />
                    </TableCell>
                ) : (
                    <></>
                )}
                <TableCell>
                    <FormattedMessage id="no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="contract-type" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="customer" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="project-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="contract-no" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="probability" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="status" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="size-vnd" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="size-usd" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="contract-date" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="time-duration" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="warranty-time" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default OnGoingThead;
