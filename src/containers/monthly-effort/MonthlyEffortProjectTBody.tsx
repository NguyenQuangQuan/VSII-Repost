import { useCallback, useState } from 'react';

// materia-ui
import { TableBody, TableCell, TableRow } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// project imports
import { IMonthlyEffortProjectUser, IMonthlyEffortProjectTotal } from 'types';

interface IMonthlyEffortProjectTBodyProps {
    projects: IMonthlyEffortProjectUser[];
    total: IMonthlyEffortProjectTotal;
}

const MonthlyEffortProjectTBody = (props: IMonthlyEffortProjectTBodyProps) => {
    const { projects, total } = props;
    const theme = useTheme();
    const [dimensions, setDimensions] = useState<any>(null);
    const [projectCell, setProjectCell] = useState<any>(null);
    const [deptIdCell, setDeptIdCell] = useState<any>(null);

    /**
     *  Khi "remaining effort" âm thì hiển thị màu đỏ
     *  Ngược lại nếu "remaining effort" dương và lớn hơn 10% "total quota" thì hiển thị màu xanh dương
     *  Nếu nhỏ hơn 10% "total quota" thì hiển thị màu hồng
     */
    const remainingEffortColor = (remainingEffort: number, totalQuota: number) =>
        remainingEffort < 0 ? '#F20F0F' : remainingEffort > (totalQuota * 10) / 100 ? '#3163D4' : '#DB7093';

    const callBackRef = useCallback((domNode: any) => {
        if (domNode) {
            setDimensions(domNode.getBoundingClientRect());
        }
    }, []);

    const projectCellRef = useCallback((domNode: any) => {
        if (domNode) {
            setProjectCell(domNode.getBoundingClientRect());
        }
    }, []);

    const deptIdRef = useCallback((domNode: any) => {
        if (domNode) {
            setDeptIdCell(domNode.getBoundingClientRect());
        }
    }, []);

    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <TableBody>
            {projects.map((item, key) => (
                <TableRow key={key} style={{ background: 'white' }}>
                    <TableCell ref={projectCellRef} sx={{ position: 'sticky', left: !!matches ? 0 : 'unset', background: 'inherit' }}>
                        {item.project.projectName}
                    </TableCell>
                    <TableCell
                        align="center"
                        ref={deptIdRef}
                        sx={{ position: 'sticky', left: !!matches ? projects && projectCell?.width : 'unset', background: 'inherit' }}
                    >
                        {item.project.deptId}
                    </TableCell>
                    <TableCell
                        sx={{
                            position: 'sticky',
                            left: !!matches ? projects && projectCell?.width + deptIdCell?.width : 'unset',
                            background: 'inherit'
                        }}
                    >
                        {item.project.type}
                    </TableCell>
                    <TableCell>{item.percentageComplete}</TableCell>
                    <TableCell>{item.project.implementQuota}</TableCell>
                    <TableCell>{item.project.maintainQuota}</TableCell>
                    <TableCell>{item.totalQuota}</TableCell>
                    <TableCell sx={{ fontWeight: '700 !important', color: '#D9001B !important' }}>{item.previousQuota}</TableCell>
                    <TableCell>{item.months.january}</TableCell>
                    <TableCell>{item.months.february}</TableCell>
                    <TableCell>{item.months.march}</TableCell>
                    <TableCell>{item.months.april}</TableCell>
                    <TableCell>{item.months.may}</TableCell>
                    <TableCell>{item.months.june}</TableCell>
                    <TableCell>{item.months.july}</TableCell>
                    <TableCell>{item.months.august}</TableCell>
                    <TableCell>{item.months.september}</TableCell>
                    <TableCell>{item.months.october}</TableCell>
                    <TableCell>{item.months.november}</TableCell>
                    <TableCell>{item.months.december}</TableCell>
                    <TableCell
                        sx={{
                            position: 'sticky',
                            fontWeight: '700 !important',
                            color: '#D9001B !important',
                            background: 'inherit',
                            right: !!matches ? projects && dimensions?.width : 'unset'
                        }}
                    >
                        {item.totalUsedEffort}
                    </TableCell>
                    <TableCell
                        ref={callBackRef}
                        sx={{
                            position: 'sticky',
                            fontWeight: '700 !important',
                            color: remainingEffortColor(item.remainingEffort, item.totalQuota),
                            background: 'inherit',
                            right: !!matches ? 0 : 'unset'
                        }}
                    >
                        {item.remainingEffort}
                    </TableCell>
                </TableRow>
            ))}
            <TableRow
                sx={{
                    '& .MuiTableCell-root': {
                        fontWeight: '700 !important'
                    }
                }}
            >
                <TableCell ref={projectCellRef} sx={{ position: 'sticky', left: !!matches ? 0 : 'unset', background: '#ffffff' }}>
                    &nbsp;
                </TableCell>
                <TableCell
                    align="center"
                    sx={{ position: 'sticky', left: !!matches ? projects && projectCell?.width : 'unset', background: '#ffffff' }}
                >
                    &nbsp;
                </TableCell>
                <TableCell>&nbsp;</TableCell>
                <TableCell>&nbsp;</TableCell>
                <TableCell>&nbsp;</TableCell>
                <TableCell>&nbsp;</TableCell>
                <TableCell>Total</TableCell>
                <TableCell sx={{ fontWeight: '700 !important', color: '#D9001B !important' }}>{total.previousQuota}</TableCell>
                <TableCell>{total.months.january}</TableCell>
                <TableCell>{total.months.february}</TableCell>
                <TableCell>{total.months.march}</TableCell>
                <TableCell>{total.months.april}</TableCell>
                <TableCell>{total.months.may}</TableCell>
                <TableCell>{total.months.june}</TableCell>
                <TableCell>{total.months.july}</TableCell>
                <TableCell>{total.months.august}</TableCell>
                <TableCell>{total.months.september}</TableCell>
                <TableCell>{total.months.october}</TableCell>
                <TableCell>{total.months.november}</TableCell>
                <TableCell>{total.months.december}</TableCell>
                <TableCell
                    sx={{
                        position: 'sticky',
                        fontWeight: '700 !important',
                        color: '#D9001B !important',
                        right: !!matches ? projects && dimensions?.width : 'unset',
                        background: '#ffffff'
                    }}
                >
                    {total.totalUsedEffort}
                </TableCell>
                <TableCell
                    ref={callBackRef}
                    sx={{
                        position: 'sticky',
                        fontWeight: '700 !important',
                        right: !!matches ? 0 : 'unsset',
                        background: '#ffffff'
                    }}
                ></TableCell>
            </TableRow>
        </TableBody>
    );
};

export default MonthlyEffortProjectTBody;
