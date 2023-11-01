// material-ui
import { TableBody, TableCell, TableRow } from '@mui/material';

// project imports
import { ROW_COLOR } from 'constants/Common';
import { IMonthlyEffortMember } from 'types';
import { formatTableCellProject } from 'utils/common';

interface IMonthlyEffortMemberTBodyProps {
    pageNumber: number;
    pageSize: number;
    members: IMonthlyEffortMember[];
}

const statusColors = (differenceHours: string) => {
    return +differenceHours === 0 ? ROW_COLOR.ENOUGH : +differenceHours < 0 ? ROW_COLOR.NOT_ENOUGH : ROW_COLOR.EXCEED;
};

const MonthlyEffortMemberTBody = (props: IMonthlyEffortMemberTBodyProps) => {
    const { pageNumber, pageSize, members } = props;

    return (
        <TableBody>
            {members.map((member, key) => (
                <TableRow
                    key={key}
                    sx={{
                        backgroundColor: statusColors(member.differenceHours)
                    }}
                >
                    <TableCell>{pageSize * pageNumber + key + 1}</TableCell>
                    <TableCell>
                        {member.firstName} {member.lastName}
                    </TableCell>
                    <TableCell>{member.memberCode}</TableCell>
                    <TableCell>{member.rank}</TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>{member.effortInMonth}</TableCell>
                    <TableCell>{member.differenceHours}</TableCell>
                    <TableCell>{member.projects && formatTableCellProject(member.projects)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default MonthlyEffortMemberTBody;
