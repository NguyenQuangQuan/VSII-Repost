// materia-ui
import { TableBody, TableCell, TableRow } from '@mui/material';

// project imports
import { IWeeklyEffortProject } from 'types';
import { formatPrice } from 'utils/common';

interface IWeeklyEffortProjectTBodyProps {
    pageNumber: number;
    pageSize: number;
    projects: IWeeklyEffortProject[];
}

const WeeklyEffortProjectTBody = (props: IWeeklyEffortProjectTBodyProps) => {
    const { pageNumber, pageSize, projects } = props;
    return (
        <TableBody>
            {projects.map((item, key) => (
                <TableRow key={key}>
                    <TableCell>{pageSize * pageNumber + key + 1}</TableCell>
                    <TableCell>{item.projectName}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell sx={{ fontWeight: '700 !important' }}>{item.totalEffort}</TableCell>
                    <TableCell>{formatPrice(item.level0)}</TableCell>
                    <TableCell>{formatPrice(item.level1)}</TableCell>
                    <TableCell>{formatPrice(item.level2)}</TableCell>
                    <TableCell>{formatPrice(item.level3)}</TableCell>
                    <TableCell>{formatPrice(item.level4)}</TableCell>
                    <TableCell sx={{ fontWeight: '700 !important' }}>{formatPrice(item.totalCost)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default WeeklyEffortProjectTBody;
