import { FormattedMessage } from 'react-intl';
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION, STATUS_REQUESTS_CHECKING, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';
import { searchFormConfig } from './Config';

interface IStatusRequestsChecking {
    isShowAll: boolean;
    required?: boolean;
}

const StatusRequestsChecking = (props: IStatusRequestsChecking) => {
    const { isShowAll, required } = props;
    return (
        <Select
            required={required}
            isMultipleLanguage
            selects={
                !isShowAll
                    ? [DEFAULT_VALUE_OPTION, ...STATUS_REQUESTS_CHECKING]
                    : [DEFAULT_VALUE_OPTION_SELECT, ...STATUS_REQUESTS_CHECKING]
            }
            name={searchFormConfig.statusRequestsChecking.name}
            label={<FormattedMessage id={searchFormConfig.statusRequestsChecking.label} />}
        />
    );
};

StatusRequestsChecking.defaultProps = {
    isShowAll: false
};

export default StatusRequestsChecking;
