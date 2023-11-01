import { useCallback, useState } from 'react';

// materia-ui
import { TableCell, TableRow } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// project imports
import { IMonthsMoney } from 'types';
import { formatPrice } from 'utils/common';

interface IMonthlyProjectCostSummaryTFooterProps {
    total: IMonthsMoney;
}

const MonthlyProjectCostSummaryTFooter = (props: IMonthlyProjectCostSummaryTFooterProps) => {
    const { total } = props;
    const [dimensions, setDimensions] = useState<any>(null);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const callBackRef = useCallback((domNode: any) => {
        if (domNode) {
            setDimensions(domNode.getBoundingClientRect());
        }
    }, []);

    return (
        <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: '600', color: '#000' } }}>
            <TableCell sx={{ position: 'sticky', left: !!matches ? 0 : 'unset', background: '#ffffff' }}></TableCell>
            <TableCell colSpan={7}>&nbsp;</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell>{formatPrice(total.january)}</TableCell>
            <TableCell>{formatPrice(total.february)}</TableCell>
            <TableCell>{formatPrice(total.march)}</TableCell>
            <TableCell>{formatPrice(total.april)}</TableCell>
            <TableCell>{formatPrice(total.may)}</TableCell>
            <TableCell>{formatPrice(total.june)}</TableCell>
            <TableCell>{formatPrice(total.july)}</TableCell>
            <TableCell>{formatPrice(total.august)}</TableCell>
            <TableCell>{formatPrice(total.september)}</TableCell>
            <TableCell>{formatPrice(total.october)}</TableCell>
            <TableCell>{formatPrice(total.november)}</TableCell>
            <TableCell>{formatPrice(total.december)}</TableCell>
            <TableCell>{formatPrice(total.thirteenthSalary)}</TableCell>
            <TableCell
                sx={{
                    position: 'sticky',
                    fontWeight: '700 !important',
                    color: '#D9001B !important',
                    right: !!matches ? total && dimensions?.width : 'unset',
                    background: '#ffffff'
                }}
            >
                {formatPrice(total.totalCost)}
            </TableCell>
            <TableCell
                ref={callBackRef}
                sx={{
                    position: 'sticky',
                    right: !!matches ? 0 : 'unset',
                    background: '#ffffff'
                }}
            ></TableCell>
        </TableRow>
    );
};

export default MonthlyProjectCostSummaryTFooter;
