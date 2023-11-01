// material-ui
import { TableBody, TableCell, TableRow } from '@mui/material';

// project imports
import { IRatioJoiningProject } from 'types';
import { formatTableCellMemberInProject } from 'utils/common';

interface IRatioJoiningProjectTBodyProps {
    pageNumber: number;
    pageSize: number;
    ratioJoiningProject: IRatioJoiningProject[];
}

const RatioJoiningProjectTBody = (props: IRatioJoiningProjectTBodyProps) => {
    const { pageNumber, pageSize, ratioJoiningProject } = props;

    return (
        <TableBody>
            {ratioJoiningProject.map((member, key) => (
                <TableRow key={key}>
                    <TableCell>{pageSize * pageNumber + key + 1}</TableCell>
                    <TableCell>{member.memberCode}</TableCell>
                    <TableCell>
                        {member.firstName} {member.lastName}
                    </TableCell>
                    <TableCell>{member.userTitle}</TableCell>
                    <TableCell align="center">{member.userDept}</TableCell>
                    <TableCell>{formatTableCellMemberInProject(member.ratioJoinProject)}</TableCell>
                    {/* <TableCell align="center">{member.ratioForgetLogTime}</TableCell> */}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default RatioJoiningProjectTBody;
