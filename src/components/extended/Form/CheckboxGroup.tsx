// third party
import { FormattedMessage } from 'react-intl';

// material-ui
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Button } from '@mui/material';

// react-hook-form
import { useController, useFormContext, useWatch } from 'react-hook-form';

// project imports
import { IOption } from 'types';
import { useState } from 'react';

// assets
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ICheckboxGroupProps {
    label?: string;
    name: string;
    options?: any;
    row?: boolean;
    config: IOption;
}

const CheckboxGroup = (props: ICheckboxGroupProps) => {
    const { config, label, name, options, row, ...other } = props;
    const [limit, setLimit] = useState<number>(5);
    const methods = useFormContext();
    const {
        field: { ref, value, onChange, ...inputProps },
        fieldState: { error }
    } = useController({
        name,
        control: methods.control,
        defaultValue: []
    });

    const checkboxSelected = useWatch({ control: methods.control, name: name }) || [];

    const showMore = () => {
        setLimit(limit + 5);
    };

    const handleChange = (option: any) => {
        const newArray = [...checkboxSelected];
        const item = option;

        // Ensure array isnt empty
        if (newArray.length > 0) {
            // Attempt to find an item in array with matching id
            const index = newArray.findIndex((x) => x[config.value] === item[config.value]);

            // If theres no match add item to the array
            if (index === -1) {
                newArray.push(item);
            } else {
                // If there is a match and the value is empty, remove the item from the array
                newArray.splice(index, 1);
            }
        } else {
            // If the array is empty, add the item to the array
            newArray.push(item);
        }

        // Overwrite existing array with newArray
        onChange(newArray);
    };

    return (
        <div>
            <FormControl {...other}>
                {label && (
                    <FormLabel component="legend">
                        <FormattedMessage id={label} />
                    </FormLabel>
                )}
                <FormGroup row={row} sx={{ ml: '20px' }}>
                    {options.slice(0, limit).map((option: any) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={value?.some((checked: any) => checked[config.value] === option[config.value])}
                                    {...inputProps}
                                    inputRef={ref}
                                    onChange={() => handleChange(option)}
                                />
                            }
                            label={<p className="body2">{option[config.label]}</p>}
                            key={option[config.value]}
                            sx={{ width: '100%' }}
                        />
                    ))}
                </FormGroup>
            </FormControl>
            <FormHelperText sx={{ color: '#f44336' }}>{error?.message}</FormHelperText>
            {options.length > 5 && options.length >= limit && (
                <Button sx={{ ml: '20px', textTransform: 'inherit' }} onClick={showMore}>
                    <FormattedMessage id="show-more" /> <ExpandMoreIcon />
                </Button>
            )}
        </div>
    );
};

CheckboxGroup.defaultProps = {
    config: { label: 'label', value: undefined }
};

export default CheckboxGroup;
