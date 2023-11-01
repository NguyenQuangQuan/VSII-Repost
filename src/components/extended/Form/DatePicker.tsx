import { FormattedMessage } from 'react-intl';

// date-fns
import AdapterDateFns from '@date-io/date-fns';
import vnLocale from 'date-fns/locale/vi';

// material-ui
import { TextField } from '@mui/material';
import { LocalizationProvider, DatePicker as MuiDatePicker } from '@mui/x-date-pickers';

// react-hook-form
import { Controller, useFormContext } from 'react-hook-form';

// project imports
import { DATE_FORMAT } from 'constants/Common';
import { ReactNode } from 'react';
import Label from './Label';

interface IDatePickerProps {
    name: string;
    label?: string | ReactNode;
    disabled?: boolean;
    required?: boolean;
    onChange?: () => void;
}

const DatePicker = (props: IDatePickerProps) => {
    const { name, label, disabled, required } = props;
    const methods = useFormContext();

    const formatDay = (day: string) => {
        return day.toString();
    };

    return (
        <>
            <Controller
                control={methods.control}
                name={name}
                render={({ field, fieldState: { error } }) => {
                    return (
                        <>
                            <Label name={name} label={label} required={required} />
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vnLocale}>
                                <MuiDatePicker
                                    {...field}
                                    inputFormat={DATE_FORMAT.ddMMyyyy}
                                    dayOfWeekFormatter={(day) => {
                                        return formatDay(day);
                                    }}
                                    value={field.value}
                                    onChange={(date) => {
                                        field.onChange(date);
                                        props.onChange && props.onChange();
                                    }}
                                    disabled={disabled}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            size="small"
                                            inputProps={{ ...params.inputProps, readOnly: true }}
                                            fullWidth
                                            error={!!error}
                                            helperText={error && <FormattedMessage id={error.message} />}
                                        />
                                    )}
                                    componentsProps={{
                                        actionBar: {
                                            actions: ['clear', 'accept']
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </>
                    );
                }}
            />
        </>
    );
};

export default DatePicker;
