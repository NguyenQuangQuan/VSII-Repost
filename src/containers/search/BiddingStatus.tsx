import { FormattedMessage } from 'react-intl';
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION, BIDDING_STATUS, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';
import { searchFormConfig } from './Config';

interface IBiddingStatus {
    isShowAll?: boolean;
    required?: boolean;
}

const BiddingStatus = (props: IBiddingStatus) => {
    const { isShowAll, required } = props;
    return (
        <Select
            required={required}
            isMultipleLanguage
            selects={!isShowAll ? [DEFAULT_VALUE_OPTION, ...BIDDING_STATUS] : [DEFAULT_VALUE_OPTION_SELECT, ...BIDDING_STATUS]}
            name={!isShowAll ? searchFormConfig.biddingStatus.name : 'status'}
            label={<FormattedMessage id={searchFormConfig.biddingStatus.label} />}
        />
    );
};

BiddingStatus.defaultProps = {
    isShowAll: false
};

export default BiddingStatus;
