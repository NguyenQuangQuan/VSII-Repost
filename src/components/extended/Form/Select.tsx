import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

// material-ui
import { FormHelperText, MenuItem, Select as MuiSelect, SelectChangeEvent, SelectProps, styled } from '@mui/material';

// react-hook-form
import { Controller, useFormContext } from 'react-hook-form';

// project imports
import Label from './Label';
import { IOption } from 'types';

interface ISelectProps {
    name: string;
    label?: string | ReactNode;
    disabled?: boolean;
    handleChange?: (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => void;
    selects: IOption[];
    other?: SelectProps;
    handleChangeFullOption?: (option: IOption) => void;
    isMultipleLanguage?: boolean;
    required?: boolean;
}

const SelectWrapper = styled('div')({
    position: 'relative',
    width: '100%'
});

const Select = (props: ISelectProps) => {
    const { name, label, handleChange, handleChangeFullOption, selects, disabled, isMultipleLanguage, required, ...other } = props;
    const methods = useFormContext();

    // Events
    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => {
        handleChange && handleChange(event);
    };

    return (
        <Controller
            name={name}
            control={methods.control}
            render={({ field: { value, ref, onChange, ...field }, fieldState: { error } }) => (
                <SelectWrapper>
                    <Label name={name} label={label} required={required} />
                    <MuiSelectStyle
                        {...field}
                        {...other}
                        disabled={disabled}
                        displayEmpty
                        size="small"
                        onChange={(event) => {
                            handleChangeSelect(event);
                            onChange(event.target.value);
                        }}
                        error={!!error}
                        fullWidth
                        value={value}
                        MenuProps={MenuProps}
                        ref={ref}
                    >
                        {selects?.map((option: IOption, key) => (
                            <MenuItem
                                key={key}
                                value={option.value}
                                disabled={option?.disabled}
                                onClick={() => handleChangeFullOption && handleChangeFullOption(option)}
                            >
                                {isMultipleLanguage || !option.value ? <FormattedMessage id={option.label} /> : option.label}
                            </MenuItem>
                        ))}
                    </MuiSelectStyle>
                    <FormHelperText sx={{ color: '#f44336' }}>{error && <FormattedMessage id={error.message} />}</FormHelperText>
                </SelectWrapper>
            )}
        />
    );
};

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 250
        }
    }
};

const MuiSelectStyle = styled(MuiSelect)({});

export default Select;
