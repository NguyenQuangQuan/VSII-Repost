// material-ui
import { TableBody, TableCell, TableRow } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// project imports
import { IDetailReportByMonth } from 'types';
import { formatPrice } from 'utils/common';

interface IDetailReportByMonthTBodyProps {
    projects: IDetailReportByMonth[];
}

const DetailReportByMonthTBody = (props: IDetailReportByMonthTBodyProps) => {
    const { projects } = props;
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <TableBody>
            {projects.map((item, key) => (
                <TableRow key={key} style={{ background: 'white' }}>
                    <TableCell sx={{ position: 'sticky', left: !!matches ? 0 : 'unset', background: 'inherit' }}>{item.project}</TableCell>
                    <TableCell align="center">{item.dept}</TableCell>
                    <TableCell align="left">{item.projectType}</TableCell>
                    <TableCell align="center">{item.totalEffort}</TableCell>
                    <TableCell align="center">{formatPrice(item.overheadAllocatedAmt)}</TableCell>
                    <TableCell align="center">{formatPrice(item.salaryCost)}</TableCell>
                    <TableCell align="center">{formatPrice(item.totalCost)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default DetailReportByMonthTBody;
