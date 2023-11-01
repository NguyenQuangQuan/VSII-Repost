import { TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { IMonthlyEffortMemberProject } from 'types';

interface IMonthlyEffortProjectTBodyProps {
    pageNumber: number;
    pageSize: number;
    projects: IMonthlyEffortMemberProject[];
}

const MonthlyEffortProjectTBody = (props: IMonthlyEffortProjectTBodyProps) => {
    const { pageNumber, pageSize, projects } = props;

    return (
        <TableBody>
            {projects.map((item, key) => (
                <TableRow key={key}>
                    <TableCell>{pageSize * pageNumber + key + 1}</TableCell>
                    <TableCell>{item.projectName}</TableCell>
                    <TableCell>{item.deptId}</TableCell>
                    <TableCell sx={{ fontWeight: '700 !important' }}>{item.totalEffort}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default MonthlyEffortProjectTBody;
