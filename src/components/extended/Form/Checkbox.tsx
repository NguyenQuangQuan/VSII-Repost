import React, { ReactNode } from 'react';

// material-ui
import { CheckboxProps, Checkbox, FormControlLabel, SxProps } from '@mui/material';

// react-hook-form
import { Controller, useFormContext } from 'react-hook-form';

interface ICheckboxCustomProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'> {
    name: string;
    label?: string | ReactNode;
    disabled?: boolean;
    checkboxProps?: CheckboxProps;
    isControl: boolean;
    valueChecked?: any;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    indeterminate?: boolean;
    sx?: SxProps<any>;
}

const CheckboxCustom = (props: ICheckboxCustomProps): JSX.Element => {
    const { name, label, disabled, checkboxProps, isControl, valueChecked, handleChange, indeterminate, sx } = props;
    const methods = useFormContext();

    return (
        <>
            {isControl ? (
                <Controller
                    name={name}
                    control={methods.control}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <FormControlLabel
                                sx={sx}
                                control={
                                    <Checkbox
                                        id={name}
                                        {...checkboxProps}
                                        disabled={disabled}
                                        checked={value}
                                        onChange={(e) => {
                                            onChange(e);
                                            handleChange && handleChange(e);
                                        }}
                                    />
                                }
                                label={label}
                            />
                        </>
                    )}
                />
            ) : (
                <>
                    <FormControlLabel
                        control={
                            <Checkbox
                                id={name}
                                {...checkboxProps}
                                disabled={disabled}
                                checked={valueChecked}
                                onChange={handleChange}
                                indeterminate={indeterminate}
                            />
                        }
                        label={label}
                    />
                </>
            )}
        </>
    );
};

export default CheckboxCustom;

CheckboxCustom.defaultProps = {
    isControl: true
};
