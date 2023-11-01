import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION, DEFAULT_VALUE_OPTION_SELECT, TYPE_HOLIDAY_OPTIONS } from 'constants/Common';
import { searchFormConfig } from './Config';
import { FormattedMessage } from 'react-intl';

type IHolidayTypeProps = {
    select?: boolean | null;
    required?: boolean;
};

const HolidayType = (props: IHolidayTypeProps) => {
    const { select, required } = props;
    return (
        <Select
            isMultipleLanguage
            required={required}
            selects={!select ? [DEFAULT_VALUE_OPTION, ...TYPE_HOLIDAY_OPTIONS] : [DEFAULT_VALUE_OPTION_SELECT, ...TYPE_HOLIDAY_OPTIONS]}
            name={searchFormConfig.holidayType.name}
            label={<FormattedMessage id={searchFormConfig.holidayType.label} />}
        />
    );
};

export default HolidayType;
