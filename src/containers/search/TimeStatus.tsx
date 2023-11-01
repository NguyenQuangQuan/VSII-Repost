import { FormattedMessage } from 'react-intl';

// project imports
import { DEFAULT_VALUE_OPTION, TIME_STATUS, TIME_STATUS_BY_NON_BILL } from 'constants/Common';
import { searchFormConfig } from './Config';
import { Select, MultipleSelect } from 'components/extended/Form';

interface ITimeStatusProps {
    isMultiple?: boolean;
    isNonBill?: boolean;
}

const TimeStatus = ({ isMultiple, isNonBill }: ITimeStatusProps): JSX.Element => {
    return (
        <>
            {isMultiple ? (
                <MultipleSelect
                    isMultipleLanguage
                    selects={TIME_STATUS}
                    name={searchFormConfig.timeStatus.name}
                    label={<FormattedMessage id={searchFormConfig.timeStatus.label} />}
                />
            ) : (
                <Select
                    isMultipleLanguage
                    selects={isNonBill ? TIME_STATUS_BY_NON_BILL : [DEFAULT_VALUE_OPTION, ...TIME_STATUS]}
                    name={searchFormConfig.timeStatus.name}
                    label={<FormattedMessage id={searchFormConfig.timeStatus.label} />}
                />
            )}
        </>
    );
};

TimeStatus.defaultProps = {
    isNonBill: false
};

export default TimeStatus;
