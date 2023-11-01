// materia-ui
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';

// project imports
import { TIME_STATUS_BY_NON_BILL } from 'constants/Common';
import { PERMISSIONS } from 'constants/Permission';
import { INonBillableMonitoring } from 'types';
import { checkAllowedPermission } from 'utils/authorization';
import { formatTableCellProject } from 'utils/common';

interface NonBillByMemberTBodyProps {
    data: INonBillableMonitoring[];
    handleOpenCommentDialog: (userId?: string, subTitle?: string) => void;
}

const statusColors = (timeStatus: string) => {
    const colors = TIME_STATUS_BY_NON_BILL.filter((el) => {
        return el.value === timeStatus;
    });
    return colors.length > 0 ? colors[0].color : '#ffffff';
};

const NonBillByMemberTBody = (props: NonBillByMemberTBodyProps) => {
    const { data, handleOpenCommentDialog } = props;
    const { nonBillable } = PERMISSIONS.report;

    return (
        <TableBody>
            {data.map((item, key) => (
                <TableRow
                    key={key}
                    sx={{
                        backgroundColor: statusColors(item.timeStatus)
                    }}
                >
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.firstName + ' ' + item.lastName}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.nonbillDivideTotal}</TableCell>
                    <TableCell>{item.projectList && formatTableCellProject(item.projectList)}</TableCell>
                    <TableCell sx={{ fontWeight: '700 !important' }}>{item.notLogtimeYet}</TableCell>
                    <TableCell sx={{ fontWeight: '700 !important' }}>{item.billAbleProject}</TableCell>
                    {checkAllowedPermission(nonBillable.commentDetail) && (
                        <TableCell>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Tooltip
                                    placement="top"
                                    title={item.comment?.note}
                                    onClick={() => handleOpenCommentDialog(item.userId, `${item.firstName} ${item.lastName}`)}
                                >
                                    <IconButton aria-label="comment" size="small">
                                        <SpeakerNotesIcon sx={{ fontSize: '1.1rem' }} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </TableCell>
                    )}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default NonBillByMemberTBody;
