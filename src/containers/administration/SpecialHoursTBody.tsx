import { FormattedMessage } from 'react-intl';

// materia-ui
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// project imports
import { ISpecialHours } from 'types';
import { dateFormat } from 'utils/date';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

interface ISpecialHoursTBodyProps {
    pageNumber: number;
    pageSize: number;
    specialHours: ISpecialHours[];
    handleOpen: (specialHours?: ISpecialHours) => void;
}

const SpecialHoursTBody = (props: ISpecialHoursTBodyProps) => {
    const { pageNumber, pageSize, specialHours, handleOpen } = props;
    const { specialHoursPermission } = PERMISSIONS.admin;

    const getTranslateSpecialHoursByType = (specialHoursType: string) => {
        switch (specialHoursType) {
            case '0':
                return <FormattedMessage id="annual" />;
            case '1':
                return <FormattedMessage id="post-pregnancy" />;
            case '2':
                return <FormattedMessage id="maternity" />;
            case '3':
                return <FormattedMessage id="unpaid-leave" />;
            case '4':
                return <FormattedMessage id="other" />;
            default:
                return '';
        }
    };

    return (
        <TableBody>
            {specialHours.map((special, key) => (
                <TableRow key={key}>
                    <TableCell>{pageSize * pageNumber + key + 1}</TableCell>
                    <TableCell>{special.memberCode}</TableCell>
                    <TableCell>{special.userName}</TableCell>
                    <TableCell>{dateFormat(special.fromDate)}</TableCell>
                    <TableCell>{dateFormat(special.toDate)}</TableCell>
                    <TableCell>{getTranslateSpecialHoursByType(special.type)}</TableCell>
                    <TableCell>{special.hourPerDay}</TableCell>
                    <TableCell>{special.note}</TableCell>

                    {checkAllowedPermission(specialHoursPermission.edit) && (
                        <TableCell>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen(special)}>
                                    <IconButton aria-label="edit" size="small">
                                        <EditTwoToneIcon sx={{ fontSize: '1.1rem' }} />
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

export default SpecialHoursTBody;
