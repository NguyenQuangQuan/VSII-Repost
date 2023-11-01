import { FormattedMessage } from 'react-intl';
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION, POSSIBILITY, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';
import { searchFormConfig } from './Config';

interface IPossibilityProps {
    isShowAll: boolean;
    required?: boolean;
}

const Possibility = (props: IPossibilityProps) => {
    const { isShowAll, required } = props;
    return (
        <Select
            required={required}
            isMultipleLanguage
            selects={!isShowAll ? [DEFAULT_VALUE_OPTION, ...POSSIBILITY] : [DEFAULT_VALUE_OPTION_SELECT, ...POSSIBILITY]}
            name={searchFormConfig.possibility.name}
            label={<FormattedMessage id={searchFormConfig.possibility.label} />}
        />
    );
};

Possibility.defaultProps = {
    isShowAll: false
};

export default Possibility;
