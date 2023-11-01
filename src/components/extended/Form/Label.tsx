// material-ui
import { InputLabel, InputLabelProps } from '@mui/material';
import { ReactNode } from 'react';

type TLabelProps = {
    name: string;
    label: string | ReactNode;
    other?: InputLabelProps;
    required?: boolean;
};

const Label = (props: TLabelProps) => {
    const { name, label, other, required } = props;
    return (
        <InputLabel htmlFor={name} required={required} {...other} sx={{ textTransform: 'capitalize' }}>
            {label}
        </InputLabel>
    );
};

Label.defaultProps = {
    name: '',
    label: '',
    required: false
};

export default Label;
