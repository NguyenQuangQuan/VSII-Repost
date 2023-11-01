import { FormattedMessage } from 'react-intl';

// material-ui
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';

// product imports
import { dateFormat } from 'utils/date';
import { IHoliday } from 'types';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

// third party

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
interface IManageHolidayTBodyProps {
    pageNumber: number;
    pageSize: number;
    holidays: IHoliday[];
    handleOpen: (holiday?: IHoliday) => void;
    handleOpenConfirm: (id: string) => void;
}

const ManageHolidayTBody = (props: IManageHolidayTBodyProps) => {
    const { pageNumber, pageSize, holidays, handleOpen, handleOpenConfirm } = props;
    const { holidayPermission } = PERMISSIONS.admin;

    const getTranslateHolidayByType = (holidayType: string) => {
        switch (holidayType) {
            case '1':
                return <FormattedMessage id="annual" />;
            case '0':
                return <FormattedMessage id="current-year" />;
            default:
                return '';
        }
    };

    return (
        <TableBody>
            {holidays?.map((holiday: IHoliday, key: number) => (
                <TableRow key={key}>
                    <TableCell>{pageSize * pageNumber + key + 1}</TableCell>
                    <TableCell>{dateFormat(holiday.fromDate)}</TableCell>
                    <TableCell>{dateFormat(holiday.toDate)}</TableCell>
                    <TableCell>{getTranslateHolidayByType(holiday.type)}</TableCell>
                    <TableCell>{holiday.note}</TableCell>
                    {checkAllowedPermission(holidayPermission.edit) && (
                        <TableCell>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen(holiday)}>
                                    <IconButton aria-label="delete" size="small">
                                        <EditTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                    placement="top"
                                    title={<FormattedMessage id="delete" />}
                                    onClick={() => handleOpenConfirm(holiday.idHexString)}
                                >
                                    <IconButton aria-label="delete" size="small">
                                        <HighlightOffIcon sx={{ fontSize: '1.1rem' }} />
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

export default ManageHolidayTBody;
