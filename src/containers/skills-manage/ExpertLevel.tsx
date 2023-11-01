// material-ui
import { FormControlLabel, Radio as MuiRadio, RadioGroup as MuiRadioGroup, Stack } from '@mui/material';

// react-hook-form
import { Controller, useFormContext } from 'react-hook-form';

// project imports
import { IOption } from 'types';

interface IRadioProps {
    name: string;
    options: IOption[];
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExpertLevel = (props: IRadioProps) => {
    const { name, options, handleChange } = props;
    const methods = useFormContext();

    return (
        <Controller
            name={name}
            control={methods.control}
            render={({ field }) => {
                return (
                    <>
                        <MuiRadioGroup
                            {...field}
                            sx={{ height: '100%' }}
                            onChange={(e) => {
                                field.onChange(e);
                                handleChange && handleChange(e);
                            }}
                        >
                            <Stack direction="row" justifyContent="space-between" sx={{ height: '100%' }}>
                                {options.map((op, index) => (
                                    <FormControlLabel
                                        key={index}
                                        sx={{
                                            width: '20%',
                                            margin: '0',
                                            borderRight: '1px solid #797979',
                                            justifyContent: 'center',
                                            '&:nth-last-of-type(1)': {
                                                borderRight: 'none'
                                            },
                                            '& .MuiTypography-root': {
                                                display: 'none'
                                            }
                                        }}
                                        value={op.value}
                                        control={<MuiRadio />}
                                        label={op.label}
                                        disabled={op?.disabled}
                                    />
                                ))}
                            </Stack>
                        </MuiRadioGroup>
                    </>
                );
            }}
        />
    );
};

export default ExpertLevel;
