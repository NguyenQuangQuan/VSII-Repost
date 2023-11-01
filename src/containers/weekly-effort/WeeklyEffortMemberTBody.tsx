// material-ui
import { TableBody, TableCell, TableRow } from '@mui/material';

// project imports
import { ROW_COLOR } from 'constants/Common';
import { IWeeklyEffortMember } from 'types';
import { formatTableCellProject } from 'utils/common';

interface IWeeklyEffortMemberTBodyProps {
    pageNumber: number;
    pageSize: number;
    members: IWeeklyEffortMember[];
}

const statusColors = (differenceHours: string) => {
    return +differenceHours === 0 ? ROW_COLOR.ENOUGH : +differenceHours < 0 ? ROW_COLOR.NOT_ENOUGH : ROW_COLOR.EXCEED;
};

const WeeklyEffortMemberTBody = (props: IWeeklyEffortMemberTBodyProps) => {
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
                    <TableCell>{member.effortInWeek}</TableCell>
                    <TableCell>{member.differenceHours}</TableCell>
                    <TableCell>{member.projectList && formatTableCellProject(member.projectList)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default WeeklyEffortMemberTBody;
