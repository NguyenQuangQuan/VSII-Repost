// material-ui
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCallback, useState } from 'react';

// project imports
import { IMonthlyProjectCostSummary } from 'types';
import { formatPrice } from 'utils/common';

interface IMonthlyProjectCostSummaryTBodyProps {
    projects: IMonthlyProjectCostSummary[];
    handleOpen: (projectId: string) => void;
}

const MonthlyProjectCostSummaryTBody = (props: IMonthlyProjectCostSummaryTBodyProps) => {
    const { projects, handleOpen } = props;
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const [dimensions, setDimensions] = useState<any>(null);
    const [projectNameCell, setProjectNameCell] = useState<any>(null);

    const callBackRef = useCallback((domNode: any) => {
        if (domNode) {
            setDimensions(domNode.getBoundingClientRect());
        }
    }, []);

    const projectNameRef = useCallback((domNode: any) => {
        if (domNode) {
            setProjectNameCell(domNode.getBoundingClientRect());
        }
    }, []);

    /**
     *  + Dự án nào có Remaining accumulation âm thì để số ở cột Remaining accumulation là màu đỏ
        + Dự án nào có Remaining accumulation dương thì để chữ màu xanh
        + Dự án nào có Remaining accumulation < 10% (so với giá trị hợp đồng) thì để màu HỒNG
     */
    const remainingAccumulationColor = (remainingAccumulation: number, contractSize: number) =>
        remainingAccumulation < 0 ? '#F20F0F' : remainingAccumulation < (contractSize * 10) / 100 ? '#DB7093' : '#3163D4';

    return (
        <TableBody>
            {projects.map((item, key) => (
                <TableRow key={key} style={{ background: 'white' }}>
                    <TableCell
                        ref={projectNameRef}
                        onClick={() => handleOpen(item.projectId)}
                        sx={{
                            position: 'sticky',
                            left: !!matches ? 0 : 'unset',
                            background: 'inherit',
                            textDecoration: 'underline',
                            color: 'initial',
                            cursor: 'pointer',
                            '&:hover': {
                                color: '#3163d4'
                            }
                        }}
                    >
                        {item.projectName}
                    </TableCell>
                    <TableCell
                        sx={{
                            background: 'inherit',
                            position: 'sticky',
                            left: !!matches ? projects && projectNameCell?.width : 'unset'
                        }}
                    >
                        {item.projectType}
                    </TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.contractNo}</TableCell>
                    <TableCell>{formatPrice(item.contractSize)}</TableCell>
                    <TableCell>{formatPrice(item.license)}</TableCell>
                    <TableCell>{item.costs ? formatPrice(item.costs[0].costs) : 0}</TableCell>
                    <TableCell>{formatPrice(item.costs[1].costs)}</TableCell>
                    <TableCell align="center" sx={{ fontWeight: '700 !important', color: '#D9001B !important' }}>
                        {formatPrice(item.remaining)}
                    </TableCell>
                    <TableCell>{formatPrice(item.months.january)}</TableCell>
                    <TableCell>{formatPrice(item.months.february)}</TableCell>
                    <TableCell>{formatPrice(item.months.march)}</TableCell>
                    <TableCell>{formatPrice(item.months.april)}</TableCell>
                    <TableCell>{formatPrice(item.months.may)}</TableCell>
                    <TableCell>{formatPrice(item.months.june)}</TableCell>
                    <TableCell>{formatPrice(item.months.july)}</TableCell>
                    <TableCell>{formatPrice(item.months.august)}</TableCell>
                    <TableCell>{formatPrice(item.months.september)}</TableCell>
                    <TableCell>{formatPrice(item.months.october)}</TableCell>
                    <TableCell>{formatPrice(item.months.november)}</TableCell>
                    <TableCell>{formatPrice(item.months.december)}</TableCell>
                    <TableCell>{formatPrice(item.months.thirteenthSalary)}</TableCell>
                    <TableCell
                        sx={{
                            position: 'sticky',
                            fontWeight: '700 !important',
                            color: '#D9001B !important',
                            right: !!matches ? projects && dimensions?.width : 'unset',
                            background: 'inherit'
                        }}
                    >
                        {formatPrice(item.totalCost)}
                    </TableCell>
                    <TableCell
                        ref={callBackRef}
                        sx={{
                            position: 'sticky',
                            fontWeight: '700 !important',
                            color: remainingAccumulationColor(item.remainingAccumulation, item.contractSize),
                            right: !!matches ? 0 : 'unset',
                            background: 'inherit'
                        }}
                    >
                        {formatPrice(item.remainingAccumulation)}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default MonthlyProjectCostSummaryTBody;
