// Third party
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

// project import
import Modal from 'components/extended/Modal';
import { IListLogTime, IWeeklyEffortProjectDetail } from 'types';
import { dateFormat } from 'utils/date';

interface IWeeklyEffortSpentTimeDetailProps {
    open: boolean;
    projectDetailUser: IWeeklyEffortProjectDetail;
    handleClose: () => void;
}

const WeeklyEffortSpentTimeDetail = (props: IWeeklyEffortSpentTimeDetailProps) => {
    const { open, handleClose, projectDetailUser } = props;
    const intl = useIntl();

    return (
        <Modal
            isOpen={open}
            title={`${intl.formatMessage({ id: 'spent-time-detail' })} - ${projectDetailUser.firstName} ${projectDetailUser.lastName}`}
            onClose={handleClose}
            keepMounted={false}
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <FormattedMessage id="no" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="date" />
                            </TableCell>
                            <TableCell align="center">
                                <FormattedMessage id="task-name" />
                            </TableCell>
                            <TableCell align="center">
                                <FormattedMessage id="spent-time" />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projectDetailUser.listLogtime.map((item: IListLogTime, key: number) => (
                            <TableRow key={key}>
                                <TableCell>{key + 1}</TableCell>
                                <TableCell>{dateFormat(item.date)}</TableCell>
                                <TableCell>{item.taskName}</TableCell>
                                <TableCell align="center">{item.spentTime}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Modal>
    );
};

export default WeeklyEffortSpentTimeDetail;
