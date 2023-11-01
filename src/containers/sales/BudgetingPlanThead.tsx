import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow, Typography } from '@mui/material';

// project imports
import { PERMISSIONS } from 'constants/Permission';
import { checkAllowedPermission } from 'utils/authorization';

const BudgetingPlanThead = () => {
    const { budgetingPermission } = PERMISSIONS.sale.salePipeline;

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <Typography sx={{ width: '50px' }}>
                        <FormattedMessage id="type" />
                    </Typography>
                </TableCell>
                <TableCell>
                    <FormattedMessage id="project-name" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="service-type" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="of-months" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="contracted-value" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="effort-limit-man-hours" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="cost-limit-VND" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="project-set-revenue-VND" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="estimated-KPI-project-saving-cost" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="estimated-share-company-profit" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="estimated-total-KPI-bonus" />
                </TableCell>
                {checkAllowedPermission(budgetingPermission.edit) && (
                    <TableCell>
                        <FormattedMessage id="action" />
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

export default BudgetingPlanThead;
