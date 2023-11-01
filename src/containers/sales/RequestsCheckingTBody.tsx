// materia-ui
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material';

// third party
import { FormattedMessage } from 'react-intl';

// project imports
import { IRequestsChecking } from 'types';
import { PERMISSIONS } from 'constants/Permission';
import { checkAllowedPermission } from 'utils/authorization';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { dateFormat } from 'utils/date';

interface RequestsCheckingTBodyProps {
    pageNumber: number;
    pageSize: number;
    requests: IRequestsChecking[];
    handleOpen: (request?: IRequestsChecking) => void;
    handleOpenDeleteConfirm: (request: IRequestsChecking, type?: string) => void;
}

const RequestsCheckingTBody = (props: RequestsCheckingTBodyProps) => {
    const { requests, handleOpen, pageNumber, pageSize, handleOpenDeleteConfirm } = props;
    const { saleList } = PERMISSIONS.sale;
    const getTranslateStatus = (status: any) => {
        switch (status) {
            case 'Not Start':
                return <FormattedMessage id="not-start" />;
            case 'Inprogress':
                return <FormattedMessage id="inprogress" />;
            case 'Stop':
                return <FormattedMessage id="stop" />;
            default:
                return '';
        }
    };

    const getTranslatePossibility = (possibility: any) => {
        switch (possibility) {
            case 'High':
                return <FormattedMessage id="high" />;
            case 'Normal':
                return <FormattedMessage id="normal" />;
            case 'Low':
                return <FormattedMessage id="low" />;
            default:
                return '';
        }
    };
    return (
        <TableBody>
            {requests.map((request: IRequestsChecking, key: number) => (
                <TableRow key={key}>
                    <TableCell>{pageSize * pageNumber + key + 1}</TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={request.partnerName}>
                                <Typography className="tooltip-content">{request.partnerName}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>{dateFormat(request.receivedDate)}</TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={request.request}>
                                <Typography className="tooltip-content">{request.request}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={request.technology}>
                                <Typography className="tooltip-content">{request.technology}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={request.timeline}>
                                <Typography className="tooltip-content">{request.timeline}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        {request.picFirstName} {request.picLastName}
                    </TableCell>
                    <TableCell>{getTranslateStatus(request.status)}</TableCell>
                    <TableCell>{getTranslatePossibility(request.possibility)}</TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={request.domain}>
                                <Typography className="tooltip-content">{request.domain}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={request.note}>
                                <Typography className="tooltip-content">{request.note}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    {checkAllowedPermission(saleList.editRequest) && (
                        <TableCell>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen(request)}>
                                    <IconButton aria-label="edit" size="small">
                                        <EditTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                    placement="top"
                                    title={<FormattedMessage id="delete" />}
                                    onClick={() => handleOpenDeleteConfirm(request, 'delete')}
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

export default RequestsCheckingTBody;
