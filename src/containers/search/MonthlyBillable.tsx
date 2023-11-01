// third party
import { FormattedMessage } from 'react-intl';

// material-ui
import { SelectChangeEvent } from '@mui/material';

// project imports
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION_SELECT, MONTHLY_BILLABLE } from 'constants/Common';
import { searchFormConfig } from './Config';

interface IMonthlyBillableProps {
    disabled?: boolean;
    handleChange?: (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => void;
    required?: boolean;
}

const MonthlyBillable = (props: IMonthlyBillableProps) => {
    const { disabled, handleChange, required } = props;
    return (
        <Select
            required={required}
            disabled={disabled}
            selects={[DEFAULT_VALUE_OPTION_SELECT, ...MONTHLY_BILLABLE]}
            handleChange={handleChange}
            name={searchFormConfig.month.name}
            label={<FormattedMessage id={searchFormConfig.month.label} />}
        />
    );
};

export default MonthlyBillable;
