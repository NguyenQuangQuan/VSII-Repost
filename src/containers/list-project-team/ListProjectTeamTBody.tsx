// material-ui
import { TableBody, TableCell, TableRow, IconButton, Stack, Tooltip } from '@mui/material';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

// project imports
import { IProjectTeam } from 'types';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

// import { IconCheck } from '@tabler/icons';
import { formatTableCellMemberInProject } from 'utils/common';

interface IListProjectTeamTBodyProps {
    pageNumber: number;
    pageSize: number;
    projectTeam: IProjectTeam[];
    handleOpenCommentDialog: (userId?: string, subTitle?: string) => void;
}

// const isNotLogTime = (notLogTime: boolean) => {
//     return notLogTime ? <IconCheck /> : '';
// };

const ListProjectTeamTBody = (props: IListProjectTeamTBodyProps) => {
    const { pageNumber, pageSize, projectTeam, handleOpenCommentDialog } = props;
    const { listProjectTeam } = PERMISSIONS.report;

    return (
        <TableBody>
            {projectTeam.map((member, key) => (
                <TableRow key={key}>
                    <TableCell>{pageSize * pageNumber + key + 1}</TableCell>
                    <TableCell>{member.memberCode}</TableCell>
                    <TableCell>
                        {member.firstName} {member.lastName}
                    </TableCell>
                    <TableCell>{member.userTitle}</TableCell>
                    <TableCell align="center">{member.userDept}</TableCell>
                    <TableCell>{formatTableCellMemberInProject(member.mainHeadCount)}</TableCell>
                    <TableCell>{formatTableCellMemberInProject(member.subHeadCount)}</TableCell>
                    <TableCell>{formatTableCellMemberInProject(member.projectNonBillable)}</TableCell>
                    {checkAllowedPermission(listProjectTeam.commentDetail) && (
                        <TableCell>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Tooltip
                                    placement="top"
                                    title={member.comment?.note}
                                    onClick={() => handleOpenCommentDialog(member.userId, `${member.firstName} ${member.lastName}`)}
                                >
                                    <IconButton aria-label="comment" size="small">
                                        <SpeakerNotesIcon sx={{ fontSize: '1.1rem' }} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </TableCell>
                    )}

                    {/* <TableCell align="center">{isNotLogTime(member.notLogTime)}</TableCell> */}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default ListProjectTeamTBody;
