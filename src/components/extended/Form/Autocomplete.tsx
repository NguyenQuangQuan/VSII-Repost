import { ReactNode } from 'react';

// react hook form
import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

// material-ui
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';

// project imports
import { IOption } from 'types';
import Label from './Label';

interface IAutocompleteProps {
    name: string;
    label?: string | ReactNode;
    options: IOption[];
    disabled: boolean;
    handleChange?: (data: any) => void;
    handleClose?: () => void;
    groupBy?: any;
    isDisableClearable: boolean;
    isDefaultAll?: boolean;
    required?: boolean;
    multiple?: boolean;
}

const Autocomplete = (props: IAutocompleteProps) => {
    const intl = useIntl();
    const {
        name,
        label,
        options,
        disabled,
        handleChange,
        handleClose,
        groupBy,
        isDisableClearable,
        isDefaultAll,
        required,
        multiple,
        ...other
    } = props;

    const methods = useFormContext();
    const placeholder = !isDefaultAll ? intl.formatMessage({ id: 'select-all' }) : intl.formatMessage({ id: 'select-option' });

    return (
        <Controller
            name={name}
            control={methods.control}
            render={({ field: { value, ref, onChange, ...field }, fieldState: { error } }) => (
                <>
                    <Label name={name} label={label} required={required} />
                    <MuiAutocomplete
                        id={name}
                        {...other}
                        disablePortal
                        disabled={disabled}
                        value={value}
                        onChange={(_, data: IOption) => {
                            onChange(data);
                            handleChange && handleChange(data);
                            if (!data) {
                                handleClose?.();
                            }
                        }}
                        multiple={multiple}
                        autoComplete={true}
                        disableClearable={isDisableClearable}
                        options={options}
                        renderOption={(props, item) => (
                            <span {...props} key={item.key}>
                                {item.label}
                            </span>
                        )}
                        groupBy={groupBy}
                        isOptionEqualToValue={(option, value) => option === value}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                            <TextField
                                error={!!error}
                                helperText={error && <FormattedMessage id="required" />}
                                {...params}
                                {...field}
                                inputRef={ref}
                                size="small"
                                fullWidth
                                placeholder={placeholder}
                            />
                        )}
                    />
                </>
            )}
        />
    );
};

Autocomplete.defaultProps = {
    disabled: false,
    isDisableClearable: false
};

export default Autocomplete;
