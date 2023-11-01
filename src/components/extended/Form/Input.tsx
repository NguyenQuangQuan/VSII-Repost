import React, { ChangeEvent, ReactNode, memo } from 'react';
import { FormattedMessage } from 'react-intl';

// material-ui
import { SxProps, TextField, TextFieldProps } from '@mui/material';

// react-hook-form
import { Controller, useFormContext } from 'react-hook-form';

// project imports
import { removeExtraSpace } from 'utils/common';
import Label from './Label';

interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'> {
    name: string;
    label?: string | ReactNode;
    disabled?: boolean;
    textFieldProps?: TextFieldProps;
    required?: boolean;
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    type?: string;
    placeholder?: string;
    sx?: SxProps<any>;
}

const Input = (props: IInputProps): JSX.Element => {
    const { name, label, disabled, textFieldProps, required, type, onChangeInput, placeholder, sx } = props;
    const methods = useFormContext();

    return (
        <Controller
            name={name}
            control={methods.control}
            render={({ field: { value, ref, onChange, ...field }, fieldState: { error } }) => {
                return (
                    <>
                        <Label name={name} label={label} required={required} />
                        <TextField
                            type={type}
                            id={name}
                            {...field}
                            value={value}
                            size="small"
                            disabled={disabled}
                            onBlur={(e) => {
                                return onChange(removeExtraSpace(value));
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                onChange(e);
                                onChangeInput?.(e);
                            }}
                            fullWidth
                            placeholder={placeholder}
                            error={!!error}
                            helperText={error && <FormattedMessage id={error.message} />}
                            inputRef={ref}
                            sx={sx}
                            {...textFieldProps}
                        />
                    </>
                );
            }}
        />
    );
};

export default memo(Input);
