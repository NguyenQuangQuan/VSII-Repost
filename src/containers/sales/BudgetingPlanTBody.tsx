import { useState } from 'react';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// material-ui
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material';

// project imports
import { IBudgetingPlan, IBudgetingPlanItem } from 'types';
import { formatPrice } from 'utils/common';
import { PERMISSIONS } from 'constants/Permission';
import { checkAllowedPermission } from 'utils/authorization';

// third party
import { FormattedMessage } from 'react-intl';

interface IBudgetingPlanProps {
    data: IBudgetingPlan[];
    handleOpen: (item: IBudgetingPlanItem) => void;
}

const BudgetingPlanTBody = (props: IBudgetingPlanProps) => {
    const { data, handleOpen } = props;
    const [expandedRows, setExpandedRows] = useState<number[]>(Array.from({ length: data?.length }, (_, i) => i));
    const { budgetingPermission } = PERMISSIONS.sale.salePipeline;

    const toggleRow = (rowIndex: number) => {
        if (expandedRows.includes(rowIndex)) {
            setExpandedRows(expandedRows.filter((row) => row !== rowIndex));
        } else {
            setExpandedRows([...expandedRows, rowIndex]);
        }
    };

    return (
        <TableBody>
            {data?.map((item: IBudgetingPlan, index: number) => (
                <>
                    <TableRow key={index}>
                        <TableCell
                            colSpan={12}
                            align="center"
                            sx={{ background: '#E2EFDA', color: '#3163D4', fontWeight: '700 !important' }}
                        >
                            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                                <IconButton size="small" onClick={() => toggleRow(index)} sx={{ padding: '0', marginRight: '8px' }}>
                                    {expandedRows.includes(index) ? (
                                        <ExpandLessIcon fontSize="small" />
                                    ) : (
                                        <ExpandMoreIcon fontSize="small" />
                                    )}
                                </IconButton>
                                <Typography fontWeight={700} sx={{ flexGrow: 1, textAlign: 'center', overflow: 'hidden' }}>
                                    {item.name}
                                </Typography>
                            </Stack>
                        </TableCell>
                    </TableRow>
                    {expandedRows.includes(index) &&
                        item.budgetPlan.map((budgetingPlan: IBudgetingPlanItem, rowIndex: number) => (
                            <TableRow key={rowIndex}>
                                <TableCell>{budgetingPlan.projectInfo.type}</TableCell>
                                <TableCell>{budgetingPlan.projectInfo.projectName}</TableCell>
                                <TableCell>{budgetingPlan.projectInfo.serviceType}</TableCell>
                                <TableCell>{budgetingPlan.projectInfo.numberOfMonths}</TableCell>
                                <TableCell>{formatPrice(budgetingPlan.projectInfo.contractedValue)}</TableCell>
                                <TableCell>{formatPrice(budgetingPlan.projectInfo.effortLimitManHours)}</TableCell>
                                <TableCell>{formatPrice(budgetingPlan.projectInfo.costLimitVND)}</TableCell>
                                <TableCell>{formatPrice(budgetingPlan.projectKPIBonus.projectSetRevenue)}</TableCell>
                                <TableCell>{formatPrice(budgetingPlan.projectKPIBonus.estimatedKPIProjectSavingCost)}</TableCell>
                                <TableCell>{formatPrice(budgetingPlan.projectKPIBonus.estimatedShareCompanyProfit)}</TableCell>
                                <TableCell>{formatPrice(budgetingPlan.projectKPIBonus.totalKPIBonus)}</TableCell>
                                {checkAllowedPermission(budgetingPermission.edit) && (
                                    <TableCell>
                                        <Stack direction="row" justifyContent="center" alignItems="center">
                                            <Tooltip
                                                placement="top"
                                                title={<FormattedMessage id="edit" />}
                                                onClick={() => handleOpen(budgetingPlan)}
                                            >
                                                <IconButton aria-label="delete" size="small">
                                                    <EditTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                </>
            ))}
        </TableBody>
    );
};

export default BudgetingPlanTBody;
