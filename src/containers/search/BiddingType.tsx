import { FormattedMessage } from 'react-intl';

// project imports
import { searchFormConfig } from './Config';
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION, BIDDING_TYPE, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';

interface IBiddingTypeProps {
    isShowAll?: boolean;
    required?: boolean;
    name: string;
    disabled?: boolean;
}

const BiddingType = (props: IBiddingTypeProps) => {
    const { isShowAll, required, name, disabled } = props;
    return (
        <>
            <Select
                required={required}
                disabled={disabled}
                selects={!isShowAll ? [DEFAULT_VALUE_OPTION, ...BIDDING_TYPE] : [DEFAULT_VALUE_OPTION_SELECT, ...BIDDING_TYPE]}
                name={name}
                label={<FormattedMessage id={searchFormConfig.salePipelineOnGoingType.label} />}
            />
        </>
    );
};

BiddingType.defaultProps = {
    isShowAll: false,
    name: searchFormConfig.type.name
};

export default BiddingType;
