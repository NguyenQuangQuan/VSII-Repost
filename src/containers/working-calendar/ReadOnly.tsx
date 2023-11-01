/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

// material-ui
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { LoadingButton } from '@mui/lab';
import { IconButton, Stack, TableCell, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';

import { VerifyWorkingDay } from 'components/icons';
import { REGISTER_WORKING_CALENDAR_TYPE } from 'constants/Common';
import { PERMISSIONS } from 'constants/Permission';
import { IWorkdays, IWorkingCalendar } from 'types/working-calendar';
import { checkAllowedPermission } from 'utils/authorization';
import { getBackgroundColor } from 'utils/common';
import Total from './Total';

interface ReadOnlyProps {
    idx: number;
    toggle: string;
    item: IWorkingCalendar;
    handleEdit: (item: IWorkingCalendar) => void;
    loading: boolean;
    dataLength: number;
    handleVerify: (item: IWorkingCalendar) => void;
    isCheckEdit: boolean;
}

const ReadOnly = (props: ReadOnlyProps) => {
    const { idx, item, handleEdit, loading, toggle, dataLength, handleVerify, isCheckEdit } = props;
    const [actionsCell, setActionsCell] = useState<any>(null);
    const [memberCodeCell, setMemberCodeCell] = useState<any>(null);
    const [memberCell, setMemberCell] = useState<any>(null);

    const theme = useTheme();
    const { registerWorkingCalendar } = PERMISSIONS.workingCalendar;

    const actionsCellRef = useCallback(
        (domNode: any) => {
            if (dataLength > 0 && domNode) {
                setActionsCell(domNode.getBoundingClientRect());
            }
        },
        [dataLength]
    );

    const memberCodeRef = useCallback(
        (domNode: any) => {
            if (domNode) {
                setMemberCodeCell(domNode.getBoundingClientRect());
            }
        },
        [dataLength]
    );

    const memberRef = useCallback(
        (domNode: any) => {
            if (domNode) {
                setMemberCell(domNode.getBoundingClientRect());
            }
        },
        [dataLength]
    );

    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const getTextColor = (type: string) => {
        const option = REGISTER_WORKING_CALENDAR_TYPE.find((opt) => opt.value === type);
        return option ? option.color : '#000000';
    };

    const getStatusBackgroundColor = (status: string) => {
        return status === 'approve' ? '#ffffff' : '#fdd1b7';
    };

    return (
        <TableRow
            key={idx}
            sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                td: { textAlign: 'left' }
            }}
        >
            <TableCell
                ref={actionsCellRef}
                sx={{ position: 'sticky', left: !!matches ? 0 : 'unset', backgroundColor: getStatusBackgroundColor(item.status) }}
                component="th"
                scope="row"
            >
                <Stack direction="row">
                    {loading && toggle === item.idHexString ? (
                        <LoadingButton loading={loading} size="small">
                            <span>disabled</span>
                        </LoadingButton>
                    ) : (
                        isCheckEdit && (
                            <IconButton type="button" size="small" onClick={() => handleEdit(item)}>
                                {checkAllowedPermission(registerWorkingCalendar.editWorkingCalendar) && (
                                    <EditOutlinedIcon fontSize="small" />
                                )}
                            </IconButton>
                        )
                    )}
                </Stack>
            </TableCell>
            <TableCell
                ref={memberCodeRef}
                sx={{
                    position: 'sticky',
                    left: !!matches ? dataLength && actionsCell?.width : 'unset',
                    backgroundColor: getStatusBackgroundColor(item.status)
                }}
                component="th"
                scope="row"
            >
                {item.memberCode}
            </TableCell>
            <TableCell
                ref={memberRef}
                sx={{
                    position: 'sticky',
                    left: !!matches ? dataLength && actionsCell?.width + memberCodeCell?.width : 'unset',
                    backgroundColor: getStatusBackgroundColor(item.status)
                }}
                component="th"
                scope="row"
            >
                {item.firstName} {item.lastName}
            </TableCell>
            <TableCell
                sx={{
                    position: 'sticky',
                    left: !!matches ? dataLength && actionsCell?.width + memberCodeCell?.width + memberCell?.width : 'unset',
                    backgroundColor: getStatusBackgroundColor(item.status)
                }}
                component="th"
                scope="row"
            >
                <FormattedMessage id={item.status} />
            </TableCell>
            <TableCell component="th" scope="row" sx={{ backgroundColor: getStatusBackgroundColor(item.status) }}>
                {item.rank && item.rank.title ? item.rank.title : ''}
            </TableCell>
            <TableCell component="th" scope="row" sx={{ backgroundColor: getStatusBackgroundColor(item.status) }}>
                {item.departmentId}
            </TableCell>

            {item.workdays.map((workday: IWorkdays, index: number) => (
                <TableCell
                    key={index}
                    align="center"
                    sx={{
                        backgroundColor:
                            item.status !== 'approve' ? getStatusBackgroundColor(item.status) : getBackgroundColor(workday.dayOfWeek)
                    }}
                >
                    <Typography sx={{ width: '50px', fontWeight: 500, color: getTextColor(workday.type), textAlign: 'center' }}>
                        {workday.type}
                    </Typography>
                </TableCell>
            ))}
            <TableCell
                sx={{
                    position: 'sticky',
                    right: !!matches ? 0 : 'unset',
                    backgroundColor: getStatusBackgroundColor(item.status),
                    display: 'flex'
                }}
            >
                <Total item={item} />
                {item.status !== 'approve' && (
                    <IconButton aria-label="list" size="small" onClick={() => handleVerify(item)}>
                        {checkAllowedPermission(registerWorkingCalendar.aproveWorkingCalendar) && <VerifyWorkingDay />}
                    </IconButton>
                )}
            </TableCell>
        </TableRow>
    );
};

export default ReadOnly;
