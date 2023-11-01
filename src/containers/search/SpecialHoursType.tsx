import { FormattedMessage } from 'react-intl';
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION, DEFAULT_VALUE_OPTION_SELECT, TYPE_SPECIAL_HOURS_OPTIONS } from 'constants/Common';
import { searchFormConfig } from './Config';

type ISpecialHoursTypeProps = {
    select?: boolean | null;
    required?: boolean;
};

const SpecialHoursType = (props: ISpecialHoursTypeProps) => {
    const { select, required } = props;
    return (
        <Select
            isMultipleLanguage
            required={required}
            selects={
                !select
                    ? [DEFAULT_VALUE_OPTION, ...TYPE_SPECIAL_HOURS_OPTIONS]
                    : [DEFAULT_VALUE_OPTION_SELECT, ...TYPE_SPECIAL_HOURS_OPTIONS]
            }
            name={searchFormConfig.specialHours.name}
            label={<FormattedMessage id={searchFormConfig.specialHours.label} />}
        />
    );
};

export default SpecialHoursType;
