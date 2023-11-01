import { FormattedMessage } from 'react-intl';

// project imports
import { searchFormConfig } from './Config';
import { Select } from 'components/extended/Form';
import { EMAIL_TYPE_OPTIONS, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';
import { SelectChangeEvent } from '@mui/material';

interface IEmailTypeProps {
    required?: boolean;
    handleChange?: (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => void;
    disabled?: boolean;
}

const EmailType = (props: IEmailTypeProps) => {
    const { required, handleChange, disabled } = props;
    return (
        <>
            <Select
                isMultipleLanguage
                required={required}
                disabled={disabled}
                handleChange={handleChange}
                selects={[DEFAULT_VALUE_OPTION_SELECT, ...EMAIL_TYPE_OPTIONS]}
                name={searchFormConfig.emailType.name}
                label={<FormattedMessage id={searchFormConfig.emailType.label} />}
            />
        </>
    );
};

export default EmailType;
