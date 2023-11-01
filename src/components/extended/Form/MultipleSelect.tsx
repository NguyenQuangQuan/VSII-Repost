import { ReactNode } from 'react';

// third-party
import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

// material-ui
import { FormHelperText, IconButton, MenuItem, Select as MuiMultipleSelect, SelectProps, styled } from '@mui/material';

// project imports
import { IOption } from 'types';
import Label from './Label';

// assets
import ClearIcon from '@mui/icons-material/Clear';

interface IMultipleSelectProps {
    name: string;
    label: string | ReactNode;
    disabled?: boolean;
    selects: IOption[];
    isMultipleLanguage?: boolean;
    isOrder?: boolean;
    other?: SelectProps;
}

const MultipleSelect = (props: IMultipleSelectProps) => {
    const intl = useIntl();
    const methods = useFormContext();
    const { name, label, selects, disabled, isMultipleLanguage, isOrder, ...other } = props;
    const placeholder = intl.formatMessage({ id: 'select-all' });

    return (
        <Controller
            name={name}
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
                <>
                    <Label name={name} label={label} />
                    <MuiSelectStyle
                        {...field}
                        {...other}
                        multiple
                        disabled={disabled}
                        displayEmpty
                        endAdornment={
                            field.value.length > 0 && (
                                <IconButton sx={{ marginRight: '13px', padding: '3px' }} size="small" onClick={() => field.onChange([])}>
                                    <ClearIcon sx={{ width: '20px', height: '20px' }} />
                                </IconButton>
                            )
                        }
                        size="small"
                        error={!!error}
                        onClose={() => {
                            isOrder && field.onChange(field.value?.sort((a: number, b: number) => a - b));
                        }}
                        fullWidth
                        MenuProps={MenuProps}
                        renderValue={(selected: any) => {
                            if (selected!.length === 0) {
                                return <span>{placeholder}</span>;
                            }
                            return selected!.map((value: string, index: number) => (
                                <span key={index}>
                                    {`${index ? ', ' : ''}${isMultipleLanguage ? intl.formatMessage({ id: value }) : value}`}
                                </span>
                            ));
                        }}
                    >
                        <MenuItem disabled value="">
                            <span>{placeholder}</span>
                        </MenuItem>
                        {selects.map((option: IOption, key) => (
                            <MenuItem key={key} value={option.value}>
                                {isMultipleLanguage ? <FormattedMessage id={option.label} /> : option.label}
                            </MenuItem>
                        ))}
                    </MuiSelectStyle>
                    <FormHelperText sx={{ color: '#f44336' }}>{error && <FormattedMessage id={error.message} />}</FormHelperText>
                </>
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

const MuiSelectStyle = styled(MuiMultipleSelect)({});

MultipleSelect.defaultProps = {
    isMultipleLanguage: true
};

export default MultipleSelect;
