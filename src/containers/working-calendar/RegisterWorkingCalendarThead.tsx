/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { IWorkingCalendarSearch } from 'pages/register-working-calendar/Config';
import { IWorkdays, IWorkingCalendar } from 'types/working-calendar';
import { getBackgroundColor } from 'utils/common';

interface RegisterWorkingCalendarTbodyProps {
    conditions: IWorkingCalendarSearch;
    data: IWorkingCalendar[];
}

const RegisterWorkingCalendarThead = (props: RegisterWorkingCalendarTbodyProps) => {
    const { conditions, data } = props;
    const [dimensions, setDimensions] = useState<any>(null);
    const [actionsCell, setActionsCell] = useState<any>(null);
    const [memberCodeCell, setMemberCodeCell] = useState<any>(null);
    const [memberCell, setMemberCell] = useState<any>(null);

    const theme = useTheme();
    // eslint-disable-next-line
    const day = data[0] ? data[0].workdays.length : '';

    const callBackRef = useCallback(
        (domNode: any) => {
            if (data.length > 0 && domNode) {
                setDimensions(domNode.getBoundingClientRect());
            }
        },
        [data.length]
    );

    const actionsCellRef = useCallback(
        (domNode: any) => {
            if (data.length > 0 && domNode) {
                setActionsCell(domNode.getBoundingClientRect());
            }
        },
        [data.length]
    );

    const memberCodeRef = useCallback(
        (domNode: any) => {
            if (domNode) {
                setMemberCodeCell(domNode.getBoundingClientRect());
            }
        },
        [data.length]
    );

    const memberRef = useCallback(
        (domNode: any) => {
            if (domNode) {
                setMemberCell(domNode.getBoundingClientRect());
            }
        },
        [data.length]
    );

    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <TableHead
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: '20',
                '& span': {
                    marginRight: '5px'
                }
            }}
        >
            <TableRow>
                <TableCell rowSpan={2} ref={actionsCellRef} sx={{ left: !!matches ? 0 : 'unset', zIndex: 3 }}>
                    <Typography sx={{ width: '70px', fontWeight: '500' }}>
                        <FormattedMessage id="action" />
                    </Typography>
                </TableCell>
                <TableCell
                    ref={memberCodeRef}
                    rowSpan={2}
                    sx={{ left: !!matches ? data.length > 0 && actionsCell?.width : 'unset', zIndex: 3 }}
                >
                    <FormattedMessage id="member-code" />
                </TableCell>
                <TableCell
                    ref={memberRef}
                    rowSpan={2}
                    sx={{ left: !!matches ? data.length > 0 && actionsCell?.width + memberCodeCell?.width : 'unset', zIndex: 3 }}
                >
                    <Typography sx={{ width: '120px' }}>
                        <FormattedMessage id="member" />
                    </Typography>
                </TableCell>
                <TableCell
                    rowSpan={2}
                    sx={{
                        left: !!matches ? data.length > 0 && actionsCell?.width + memberCodeCell?.width + memberCell?.width : 'unset',
                        zIndex: 3
                    }}
                >
                    <FormattedMessage id="status" />
                </TableCell>
                <TableCell rowSpan={2}>
                    <FormattedMessage id="table-title" />
                </TableCell>
                <TableCell rowSpan={2}>
                    <FormattedMessage id="department" />
                </TableCell>
                <TableCell align="center" rowSpan={1} colSpan={Number(day)}>
                    {conditions.month} - {conditions.year}
                </TableCell>
                <TableCell ref={callBackRef} rowSpan={2} sx={{ right: !!matches ? 0 : 'unset', zIndex: 3 }}>
                    <FormattedMessage id="total" />
                </TableCell>
            </TableRow>
            <TableRow
                sx={{
                    '& .MuiTableCell-root': {
                        position: !!matches ? 'sticky' : 'unset',
                        top: dimensions && dimensions.height / 2
                    }
                }}
            >
                {data[0]?.workdays.map((workday: IWorkdays, index: number) => (
                    <TableCell
                        key={index}
                        sx={{
                            top: '0 !important',
                            backgroundColor: getBackgroundColor(workday.dayOfWeek),
                            textAlign: 'center'
                        }}
                    >
                        <Typography sx={{ width: '50px' }}>
                            <span>{workday.day}</span> <br></br>
                            <FormattedMessage id={workday.dayOfWeek} />
                        </Typography>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};
export default RegisterWorkingCalendarThead;
