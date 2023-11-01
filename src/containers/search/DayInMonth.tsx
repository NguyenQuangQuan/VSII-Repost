import { FormattedMessage } from 'react-intl';

// project imports
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';
import { searchFormConfig } from './Config';

interface IDayInMonthProps {
    required?: boolean;
}

const DayInMonth = (props: IDayInMonthProps) => {
    const { required } = props;
    const dayOptions = [DEFAULT_VALUE_OPTION_SELECT];
    for (let i = 1; i <= 31; i++) {
        const value = i.toString().padStart(2, '0');
        dayOptions.push({ value, label: value });
    }
    return (
        <>
            <Select
                required={required}
                selects={dayOptions}
                name={searchFormConfig.dayInMonth.name}
                label={<FormattedMessage id={searchFormConfig.dayInMonth.label} />}
            />
        </>
    );
};

export default DayInMonth;
