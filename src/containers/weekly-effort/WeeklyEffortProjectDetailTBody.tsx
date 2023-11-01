// materia-ui
import { Button, TableBody, TableCell, TableRow } from '@mui/material';
import { Checkbox } from 'components/extended/Form';
import { IUserVerify, IWeeklyEffortProjectDetail } from 'types';
import { dateFormat } from 'utils/date';

// project imports

interface IWeeklyEffortProjectDetailsTBodyProps {
    projectDetails: IWeeklyEffortProjectDetail[];
    handleCheckOne: (user: IUserVerify) => void;
    selected?: IUserVerify[];
    isCheckAll?: boolean;
    handleOpen: (user: IWeeklyEffortProjectDetail) => void;
}

const WeeklyEffortProjectDetailsTBody = (props: IWeeklyEffortProjectDetailsTBodyProps) => {
    const { projectDetails, handleCheckOne, selected, isCheckAll, handleOpen } = props;

    return (
        <TableBody>
            {projectDetails?.map((user: IWeeklyEffortProjectDetail, index: number) => {
                return (
                    <TableRow key={user.projectId}>
                        <TableCell>
                            <Checkbox
                                name="check"
                                isControl={false}
                                handleChange={() =>
                                    handleCheckOne({
                                        userId: user.userId,
                                        pmVerifiedDate: user.pmVerifiedDate,
                                        qaVerifiedDate: user.qaVerifiedDate
                                    })
                                }
                                valueChecked={isCheckAll || selected?.some((item: IUserVerify) => item.userId === user.userId)}
                            />
                        </TableCell>
                        <TableCell>
                            <Button
                                sx={{
                                    color: '#000',
                                    padding: '0',
                                    textAlign: 'left',
                                    '&.MuiButtonBase-root:hover': {
                                        backgroundColor: 'transparent',
                                        color: '#3163d4',
                                        fontStyle: 'italic'
                                    }
                                }}
                                onClick={() => handleOpen(user)}
                            >{`${user.firstName} ${user.lastName}`}</Button>
                        </TableCell>
                        <TableCell>{user.memberCode}</TableCell>
                        <TableCell>{user.effortInWeek}</TableCell>
                        <TableCell>{user.payAbleOT}</TableCell>
                        <TableCell>{user.nonPayAbleOT}</TableCell>
                        <TableCell>{user?.effortPMVerified}</TableCell>
                        <TableCell>{user?.payAbleOTVerified}</TableCell>
                        <TableCell>{user?.nonPayAbleOTVerified}</TableCell>
                        <TableCell>{user?.pmVerified}</TableCell>
                        <TableCell>{dateFormat(user?.pmVerifiedDate)}</TableCell>
                        <TableCell>{user?.qaVerified}</TableCell>
                        <TableCell>{dateFormat(user?.qaVerifiedDate)}</TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
};

export default WeeklyEffortProjectDetailsTBody;
