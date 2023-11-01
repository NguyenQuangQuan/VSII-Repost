// material-ui
import { FormControlLabel, RadioGroup as MuiRadioGroup, Radio as MuiRadio, Stack, FormHelperText } from '@mui/material';

// react-hook-form
import { Controller, useFormContext } from 'react-hook-form';

// project imports
import { IOption } from 'types';
import Label from './Label';
import { FormattedMessage } from 'react-intl';

interface IRadioProps {
    name: string;
    label?: string;
    required?: boolean;
    options: IOption[];
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isMultiLanguage?: boolean;
}

const Radio = (props: IRadioProps) => {
    const { name, label, required, options, handleChange, isMultiLanguage } = props;
    const methods = useFormContext();

    return (
        <Controller
            name={name}
            control={methods.control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <>
                        {label && <Label name={name} label={<FormattedMessage id={label} />} required={required} />}
                        <MuiRadioGroup
                            {...field}
                            onChange={(e) => {
                                field.onChange(e);
                                handleChange && handleChange(e);
                            }}
                        >
                            <Stack direction="row" alignItems="center">
                                {options.map((op, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={op.value}
                                        control={<MuiRadio />}
                                        label={isMultiLanguage ? <FormattedMessage id={op.label} /> : op.label}
                                        disabled={op?.disabled}
                                    />
                                ))}
                            </Stack>
                            {error && (
                                <FormHelperText sx={{ color: '#f44336' }}>
                                    <FormattedMessage id={error.message} />
                                </FormHelperText>
                            )}
                        </MuiRadioGroup>
                    </>
                );
            }}
        />
    );
};

Radio.defaultProps = {
    isMultiLanguage: true
};

export default Radio;
