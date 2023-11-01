import { FormattedMessage } from 'react-intl';

// project imports
import { searchFormConfig } from './Config';
import { Select } from 'components/extended/Form';
import { DAY_LIST, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';

interface IWeekDaysProps {
    required?: boolean;
}

const WeekDays = (props: IWeekDaysProps) => {
    const { required } = props;
    return (
        <>
            <Select
                isMultipleLanguage
                required={required}
                selects={[DEFAULT_VALUE_OPTION_SELECT, ...DAY_LIST]}
                name={searchFormConfig.weekDays.name}
                label={<FormattedMessage id={searchFormConfig.weekDays.label} />}
            />
        </>
    );
};

export default WeekDays;
