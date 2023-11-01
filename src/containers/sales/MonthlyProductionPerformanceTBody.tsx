import { Fragment, useCallback, useState } from 'react';

// materia-ui
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip, useMediaQuery, useTheme } from '@mui/material';

// project imports
import {
    ICommentForm,
    ICommentItem,
    IDataHCByMonth,
    IDepartmentPerformance,
    IDepartmentPerformanceData,
    IDepartmentPerformanceDataByMonth,
    IDepartmentPerformanceDataByTotal,
    IMonthlyProductionPerformanceInfo
} from 'types';
import { calculationSum, formatPrice } from 'utils/common';
import { GROUP_COLOR_MONTH } from 'constants/Common';
import { PERMISSIONS } from 'constants/Permission';

// assets
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { checkAllowedPermission } from 'utils/authorization';

// ==============================|| Monthly Production Performance TBODY ||============================== //

// style
const style_group_even_total = {
    '& .MuiTableCell-root:nth-of-type(8n+3),.MuiTableCell-root:nth-of-type(8n+5),.MuiTableCell-root:nth-of-type(8n+7),.MuiTableCell-root:nth-of-type(8n+9)':
        {
            backgroundColor: GROUP_COLOR_MONTH
        }
};

const style_group_even_item = {
    '& .MuiTableCell-root:nth-of-type(8n+6),.MuiTableCell-root:nth-of-type(8n+7), .MuiTableCell-root:nth-of-type(8n+8),.MuiTableCell-root:nth-of-type(8n+9)':
        {
            backgroundColor: GROUP_COLOR_MONTH
        }
};

const style_group_even_total_dept = {
    '& .MuiTableCell-root:nth-of-type(8n+3),.MuiTableCell-root:nth-of-type(8n+4),.MuiTableCell-root:nth-of-type(8n+5),.MuiTableCell-root:nth-of-type(8n+6)':
        {
            backgroundColor: GROUP_COLOR_MONTH
        }
};

// Render total headcount of months
const TotalHeadCountByMonth = ({ headCounts }: { headCounts: IDataHCByMonth[] }) => {
    return (
        <>
            {headCounts?.map((headCount: IDataHCByMonth, index: number) => (
                <Fragment key={index}>
                    <TableCell colSpan={4}>{headCount.value}</TableCell>
                </Fragment>
            ))}
        </>
    );
};

// Render total Productivity of months
const TotalProductivityByMonth = ({ productivities }: { productivities: number[] }) => {
    return (
        <>
            {productivities?.map((productivity: number, index: number) => (
                <Fragment key={index}>
                    <TableCell colSpan={4}>{formatPrice(productivity)}</TableCell>
                </Fragment>
            ))}
        </>
    );
};

// Render total money of status by months
const TotalMoneyOfStatusByMonth = ({ months }: { months: IDepartmentPerformanceDataByTotal[] }) => {
    return (
        <>
            {months?.map((month: IDepartmentPerformanceDataByTotal, index: number) => (
                <Fragment key={index}>
                    <TableCell>{formatPrice(month.delivered)}</TableCell>
                    <TableCell>{formatPrice(month.receivable)}</TableCell>
                    <TableCell>{formatPrice(month.received)}</TableCell>
                    <TableCell>{formatPrice(month.financial)}</TableCell>
                </Fragment>
            ))}
        </>
    );
};

// Render button add or edit row
const AddOrEditButton = ({ handleOpen, isEdit }: { handleOpen: (item?: IDepartmentPerformanceData) => void; isEdit?: boolean }) => {
    return (
        <Tooltip placement="top" title={isEdit ? 'Edit' : 'Add'}>
            <IconButton aria-label={isEdit ? 'Edit' : 'Add'} size="small" onClick={() => handleOpen()}>
                {isEdit ? <EditOutlinedIcon sx={{ fontSize: '1rem' }} /> : <AddCircleOutlineOutlinedIcon sx={{ fontSize: '1rem' }} />}
            </IconButton>
        </Tooltip>
    );
};

interface IMonthlyProductionPerformanceTBodyProps {
    info: IMonthlyProductionPerformanceInfo;
    handleOpen: (departmentName: IDepartmentPerformance, item?: IDepartmentPerformanceData) => void;
    handleOpenConfirm: (id: string) => void;
    handleOpenEditHeadCount: (item: IDataHCByMonth[]) => void;
    editComment: (payload?: ICommentForm) => void;
    handleOpenComment: (event: React.MouseEvent<Element>, item: ICommentItem) => void;
}

const MonthlyProductionPerformanceTBody = (props: IMonthlyProductionPerformanceTBodyProps) => {
    const { handleOpen, handleOpenEditHeadCount, handleOpenConfirm, handleOpenComment } = props;
    const monthlyProductionPerformanceInfo = props.info;
    const theme = useTheme();
    const [actionEl, setActionEl] = useState<any>(null);
    const [projectNameEl, setProjectNameEl] = useState<any>(null);
    const [serviceTypeEl, setServiceTypeEl] = useState<any>(null);
    const [contractTypeEl, setContractTypeEl] = useState<any>(null);
    const { monthlyProductionPerformancePermission } = PERMISSIONS.sale;

    // action
    const actionElRef = useCallback((domNode: any) => {
        if (domNode) setActionEl(domNode.getBoundingClientRect());
    }, []);
    // project name
    const projectNameElRef = useCallback((domNode: any) => {
        if (domNode) setProjectNameEl(domNode.getBoundingClientRect());
    }, []);
    // service type
    const serviceTypeElRef = useCallback((domNode: any) => {
        if (domNode) setServiceTypeEl(domNode.getBoundingClientRect());
    }, []);
    // contract type
    const contractTypeElRef = useCallback((domNode: any) => {
        if (domNode) setContractTypeEl(domNode.getBoundingClientRect());
    }, []);

    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const freezeDefault = { position: !!matches ? 'sticky' : 'unset', left: 0, background: '#fff' };
    const freezeActionsEl = { position: !!matches ? 'sticky' : 'unset', left: actionEl?.width, background: '#fff' };

    return (
        <TableBody>
            {/* Department list */}
            {monthlyProductionPerformanceInfo.departments.map((dept: IDepartmentPerformance, index: number) => (
                <Fragment key={index}>
                    <TableRow sx={{ backgroundColor: '#fdd1b7' }}>
                        <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', position: 'sticky', left: 0 }} align="left">
                            {dept.name}{' '}
                            {checkAllowedPermission(monthlyProductionPerformancePermission.add) && (
                                <AddOrEditButton handleOpen={() => handleOpen(dept)} />
                            )}
                        </TableCell>
                        <TableCell colSpan={13 * 4 + 4}></TableCell>
                    </TableRow>
                    <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold' }, ...style_group_even_total_dept }}>
                        <TableCell sx={freezeDefault}>&nbsp;</TableCell>
                        <TableCell sx={freezeActionsEl} colSpan={4}>
                            {dept.name} Total
                        </TableCell>
                        <TotalMoneyOfStatusByMonth months={dept.total} />
                    </TableRow>
                    {dept.data.map((item: IDepartmentPerformanceData, itemIndex: number) => (
                        <TableRow
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                ...style_group_even_item
                            }}
                            key={itemIndex}
                        >
                            <TableCell ref={actionElRef} sx={freezeDefault}>
                                <Stack direction="row" justifyContent="center" alignItems="center">
                                    {checkAllowedPermission(monthlyProductionPerformancePermission.edit) && (
                                        <AddOrEditButton
                                            handleOpen={() => handleOpen(dept, { ...item, departmentId: dept.departmentId })}
                                            isEdit
                                        />
                                    )}
                                    {checkAllowedPermission(monthlyProductionPerformancePermission.edit) && (
                                        <Tooltip placement="top" title="Delete">
                                            <IconButton
                                                aria-label="Delete"
                                                size="small"
                                                onClick={() => handleOpenConfirm(item.idHexString)}
                                            >
                                                <ClearSharpIcon sx={{ fontSize: '1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Stack>
                            </TableCell>
                            <TableCell
                                ref={projectNameElRef}
                                sx={{ cursor: 'pointer', ...freezeActionsEl, background: '#fff' }}
                                onClick={(e) =>
                                    handleOpenComment(e, {
                                        type: 'projectName',
                                        idHexString: item.idHexString,
                                        label: item.project.value,
                                        content: item.project.comment
                                    })
                                }
                            >
                                <span>{item.project.value}</span>
                            </TableCell>
                            <TableCell
                                ref={serviceTypeElRef}
                                sx={{
                                    position: !!matches ? 'sticky' : 'unset',
                                    background: '#fff',
                                    left: projectNameEl && calculationSum(actionEl?.width, projectNameEl?.width)
                                }}
                            >
                                {item.serviceType}
                            </TableCell>
                            <TableCell
                                ref={contractTypeElRef}
                                sx={{
                                    position: !!matches ? 'sticky' : 'unset',
                                    background: '#fff',
                                    left: serviceTypeEl && calculationSum(actionEl?.width, projectNameEl?.width, serviceTypeEl?.width)
                                }}
                            >
                                {item.contractType}
                            </TableCell>
                            <TableCell
                                sx={{
                                    cursor: 'pointer',
                                    position: !!matches ? 'sticky' : 'unset',
                                    background: '#fff',
                                    left:
                                        contractTypeEl &&
                                        calculationSum(actionEl?.width, projectNameEl?.width, serviceTypeEl?.width, contractTypeEl?.width)
                                }}
                                onClick={(e) =>
                                    handleOpenComment(e, {
                                        type: 'contractSize',
                                        idHexString: item.idHexString,
                                        label: item.contractSize.value,
                                        content: item.contractSize.comment
                                    })
                                }
                            >
                                <span>{formatPrice(item.contractSize.value)}</span>
                            </TableCell>
                            {item.months.map((month: IDepartmentPerformanceDataByMonth, mIndex: number) => {
                                return month.month !== 'Y-T-D' ? (
                                    <Fragment key={mIndex}>
                                        <TableCell
                                            sx={{ cursor: 'pointer' }}
                                            onClick={(e) =>
                                                handleOpenComment(e, {
                                                    type: 'delivered',
                                                    idHexString: item.idHexString,
                                                    label: month.delivered.value,
                                                    month: month.month,
                                                    content: month.delivered.comment
                                                })
                                            }
                                        >
                                            <span>{formatPrice(month.delivered.value)}</span>
                                        </TableCell>
                                        <TableCell
                                            sx={{ cursor: 'pointer' }}
                                            onClick={(e) =>
                                                handleOpenComment(e, {
                                                    type: 'receivable',
                                                    idHexString: item.idHexString,
                                                    label: month.receivable.value,
                                                    month: month.month,
                                                    content: month.receivable.comment
                                                })
                                            }
                                        >
                                            <span>{formatPrice(month.receivable.value)}</span>
                                        </TableCell>
                                        <TableCell
                                            sx={{ cursor: 'pointer' }}
                                            onClick={(e) =>
                                                handleOpenComment(e, {
                                                    type: 'received',
                                                    idHexString: item.idHexString,
                                                    label: month.received.value,
                                                    month: month.month,
                                                    content: month.received.comment
                                                })
                                            }
                                        >
                                            <span>{formatPrice(month.received.value)}</span>
                                        </TableCell>
                                        <TableCell
                                            sx={{ cursor: 'pointer' }}
                                            onClick={(e) =>
                                                handleOpenComment(e, {
                                                    type: 'financial',
                                                    idHexString: item.idHexString,
                                                    label: month.financial.value,
                                                    month: month.month,
                                                    content: month.financial.comment
                                                })
                                            }
                                        >
                                            <span>{formatPrice(month.financial.value)}</span>
                                        </TableCell>
                                    </Fragment>
                                ) : (
                                    <Fragment key={mIndex}>
                                        <TableCell>
                                            <span>{formatPrice(month.delivered.value)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span>{formatPrice(month.receivable.value)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span>{formatPrice(month.received.value)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span>{formatPrice(month.financial.value)}</span>
                                        </TableCell>
                                    </Fragment>
                                );
                            })}
                        </TableRow>
                    ))}
                </Fragment>
            ))}

            {/* Company Total */}
            <TableRow sx={{ backgroundColor: '#e6fdcf' }}>
                <TableCell sx={{ fontWeight: 'bold', position: 'sticky', whiteSpace: 'nowrap', left: 0 }} align="left">
                    Company Total
                </TableCell>
                <TableCell colSpan={13 * 4 + 4}></TableCell>
            </TableRow>
            <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold' }, ...style_group_even_total }}>
                <TableCell align="center" sx={freezeDefault}>
                    {checkAllowedPermission(monthlyProductionPerformancePermission.edit) && (
                        <AddOrEditButton
                            handleOpen={() => handleOpenEditHeadCount(monthlyProductionPerformanceInfo.companyTotals.totalHC)}
                            isEdit
                        />
                    )}
                </TableCell>
                <TableCell colSpan={4} sx={freezeActionsEl}>
                    Total HC
                </TableCell>
                <TotalHeadCountByMonth headCounts={monthlyProductionPerformanceInfo.companyTotals.totalHC} />
            </TableRow>
            <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold' }, ...style_group_even_total }}>
                <TableCell sx={freezeDefault}>&nbsp;</TableCell>
                <TableCell sx={freezeActionsEl} colSpan={4}>
                    Productivity
                </TableCell>
                <TotalProductivityByMonth productivities={monthlyProductionPerformanceInfo.companyTotals.productivity} />
            </TableRow>
            <TableRow sx={{ ...style_group_even_total_dept }}>
                <TableCell sx={freezeDefault}>&nbsp;</TableCell>
                <TableCell sx={freezeActionsEl} colSpan={4}>
                    Product
                </TableCell>
                <TotalMoneyOfStatusByMonth months={monthlyProductionPerformanceInfo.companyTotals.product} />
            </TableRow>
            <TableRow sx={{ ...style_group_even_total_dept }}>
                <TableCell sx={freezeDefault}>&nbsp;</TableCell>
                <TableCell sx={freezeActionsEl} colSpan={4}>
                    Total SI
                </TableCell>
                <TotalMoneyOfStatusByMonth months={monthlyProductionPerformanceInfo.companyTotals.totalSI} />
            </TableRow>
            <TableRow sx={{ backgroundColor: '#fde9d9' }}>
                <TableCell sx={{ ...freezeDefault, background: 'inherit' }}>&nbsp;</TableCell>
                <TableCell sx={{ ...freezeActionsEl, background: 'inherit' }} colSpan={4}>
                    Total Domestic ITO
                </TableCell>
                <TotalMoneyOfStatusByMonth months={monthlyProductionPerformanceInfo.companyTotals.totalDomesticITO} />
            </TableRow>
            <TableRow sx={{ backgroundColor: '#fde9d9' }}>
                <TableCell sx={{ ...freezeDefault, background: 'inherit' }}>&nbsp;</TableCell>
                <TableCell sx={{ ...freezeActionsEl, background: 'inherit' }} colSpan={4}>
                    Total Overseas ITO
                </TableCell>
                <TotalMoneyOfStatusByMonth months={monthlyProductionPerformanceInfo.companyTotals.totalOverseasITO} />
            </TableRow>
            <TableRow sx={{ backgroundColor: '#b7dee8' }}>
                <TableCell sx={{ ...freezeDefault, background: 'inherit' }}>&nbsp;</TableCell>
                <TableCell sx={{ ...freezeActionsEl, background: 'inherit' }} colSpan={4}>
                    Total ITO
                </TableCell>
                <TotalMoneyOfStatusByMonth months={monthlyProductionPerformanceInfo.companyTotals.totalITO} />
            </TableRow>
            <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold' }, ...style_group_even_total_dept }}>
                <TableCell sx={freezeDefault}>&nbsp;</TableCell>
                <TableCell sx={freezeActionsEl} colSpan={4}>
                    Company Total
                </TableCell>
                <TotalMoneyOfStatusByMonth months={monthlyProductionPerformanceInfo.companyTotals.companyTotal} />
            </TableRow>
        </TableBody>
    );
};

export default MonthlyProductionPerformanceTBody;
