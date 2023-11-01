// project imports
import { Input } from 'components/extended/Form';

// material-ui
import { Stack, TextFieldProps } from '@mui/material';

interface IInputTable {
    name: string;
    placeholder?: string;
    textFieldProps?: TextFieldProps;
    label?: string;
    isShowPlaceholder?: boolean;
    textAlign?: string;
    disabled?: boolean;
    required?: boolean;
}

const InputTable = (props: IInputTable) => {
    const { name, placeholder, textFieldProps, isShowPlaceholder, textAlign, disabled, label, required } = props;

    return (
        <Stack direction="row" sx={{ verticalAlign: 'top' }} alignItems="baseline" justifyContent="flex-start">
            {label && (
                <span style={{ marginRight: '3px', whiteSpace: 'nowrap', opacity: '0.6' }}>
                    {label}
                    <span className="required">{required && '*'}</span>:
                </span>
            )}
            <Input
                name={name}
                placeholder={placeholder ? placeholder : isShowPlaceholder ? 'Enter' : undefined}
                sx={{
                    border: 'none',
                    '& .MuiInputBase-input, .MuiFormHelperText-root': { textAlign: textAlign ? textAlign : 'left' },
                    '& .MuiFormHelperText-root': { margin: 0 },
                    '& .Mui-disabled': { background: 'none !important', WebkitTextFillColor: 'unset' },
                    '& input': { padding: '5px 0 !important' },
                    '& fieldset': { border: 'none' },
                    '& input:-webkit-autofill': {
                        WebkitBoxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0), inset 0 0 0 100px rgba(255, 255, 255,1)'
                    },
                    '& textarea': {
                        padding: '5px 0 0 0 !important'
                    }
                }}
                disabled={disabled}
                textFieldProps={{ ...textFieldProps }}
            />
        </Stack>
    );
};

InputTable.defaultProps = {
    isShowPlaceholder: true
};

export default InputTable;
