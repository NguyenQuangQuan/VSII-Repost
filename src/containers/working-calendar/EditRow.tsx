/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

// material-ui
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, SelectChangeEvent, Stack, TableCell, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';

// project import
import { REGISTER_WORKING_CALENDAR_TYPE } from 'constants/Common';
import Total from 'containers/working-calendar/Total';
import { WorkDayShape, WorkingCalendarFormShape } from 'pages/register-working-calendar/Config';
import { IOption } from 'types';
import { IWorkingCalendar } from 'types/working-calendar';
import { getBackgroundColor } from 'utils/common';
import { checkAllowedPermission } from 'utils/authorization';
import { VerifyWorkingDay } from 'components/icons';
import { PERMISSIONS } from 'constants/Permission';

interface EditRowProps {
    idx: number;
    handleCancel: (item: IWorkingCalendar) => void;
    item: IWorkingCalendar;
    form: UseFormReturn<WorkingCalendarFormShape, any>;
    dataLength: number;
}

const EditRow = (props: EditRowProps) => {
    const {
        idx,
        handleCancel,
        item,
        form: { control, register },
        dataLength
    } = props;
    const { fields } = useFieldArray({ control, name: 'workdays' });
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [actionsCell, setActionsCell] = useState<any>(null);
    const [memberCodeCell, setMemberCodeCell] = useState<any>(null);
    const [memberCell, setMemberCell] = useState<any>(null);

    const { registerWorkingCalendar } = PERMISSIONS.workingCalendar;

    const theme = useTheme();

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

    const handleTypeChange = (event: SelectChangeEvent<string | unknown>, index: number) => {
        const newSelectedTypes = [...selectedTypes];
        const value = event.target.value as string;
        newSelectedTypes[index] = value ?? '';
        setSelectedTypes(newSelectedTypes);
    };

    const renderColorByType = (type: string | null) => {
        const selectedOption = REGISTER_WORKING_CALENDAR_TYPE.find((option) => option.value === type);
        return selectedOption ? selectedOption.color : '';
    };

    return (
        <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell
                ref={actionsCellRef}
                sx={{ position: 'sticky', left: !!matches ? 0 : 'unset', background: '#ffffff', padding: '0 !important', zIndex: 9 }}
                component="th"
                scope="row"
            >
                <Stack direction="row">
                    <IconButton type="submit" size="small">
                        <CheckIcon fontSize="small" />
                    </IconButton>
                    <IconButton type="button" size="small" onClick={() => handleCancel(item)}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </TableCell>
            <TableCell
                ref={memberCodeRef}
                sx={{ position: 'sticky', left: !!matches ? dataLength && actionsCell?.width : 'unset', background: '#ffffff', zIndex: 9 }}
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
                    background: '#ffffff',
                    zIndex: 9
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
                    background: '#ffffff',
                    zIndex: 9
                }}
                component="th"
                scope="row"
            >
                {item.status ? <FormattedMessage id={item.status} /> : ''}
            </TableCell>
            <TableCell
                sx={{
                    position: 'sticky',
                    background: '#ffffff'
                }}
                component="th"
                scope="row"
            >
                {item?.rank && item.rank?.title ? item.rank.title : ''}
            </TableCell>
            <TableCell
                sx={{
                    position: 'sticky',
                    background: '#ffffff'
                }}
                component="th"
                scope="row"
            >
                {item.departmentId}
            </TableCell>

            {fields.map((field: WorkDayShape, index: number) => (
                <TableCell key={index} align="center" sx={{ backgroundColor: getBackgroundColor(field.dayOfWeek) }}>
                    <Typography sx={{ width: '50px' }}>
                        {field.verified ? (
                            <Typography>{field.type}</Typography>
                        ) : (
                            <select
                                key={field.day}
                                {...register(`workdays.${index}.type`, {
                                    onChange: (event) => handleTypeChange(event, index)
                                })}
                                style={{ backgroundColor: renderColorByType(selectedTypes[index] || field.type) }}
                            >
                                <option className={'backgroud-select-option'} value=""></option>
                                {REGISTER_WORKING_CALENDAR_TYPE.map((type: IOption) => (
                                    <option key={type.value} value={type.value} className={'backgroud-select-option'}>
                                        {type.value}
                                    </option>
                                ))}
                            </select>
                        )}
                    </Typography>
                </TableCell>
            ))}

            <TableCell
                sx={{
                    position: 'sticky',
                    right: !!matches ? 0 : 'unset',
                    background: '#ffffff',
                    display: 'flex'
                }}
            >
                <Total item={item} />
                {item.status !== 'approve' && (
                    <IconButton aria-label="list" size="small">
                        {checkAllowedPermission(registerWorkingCalendar.aproveWorkingCalendar) && <VerifyWorkingDay />}
                    </IconButton>
                )}
            </TableCell>
        </TableRow>
    );
};

export default EditRow;
