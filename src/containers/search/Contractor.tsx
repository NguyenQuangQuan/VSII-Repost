import { FormattedMessage } from 'react-intl';

// project imports
import { searchFormConfig } from './Config';
import { Select } from 'components/extended/Form';
import { CONTRACTOR, DEFAULT_VALUE_OPTION } from 'constants/Common';

interface IContractorProps {
    isShowAll?: boolean;
    required?: boolean;
}

const Contractor = (props: IContractorProps) => {
    const { isShowAll, required } = props;

    return (
        <>
            <Select
                isMultipleLanguage
                required={required}
                selects={isShowAll ? [DEFAULT_VALUE_OPTION, ...CONTRACTOR] : []}
                name={searchFormConfig.contractor.name}
                label={<FormattedMessage id={searchFormConfig.contractor.label} />}
            />
        </>
    );
};

Contractor.defaultProps = {
    isShowAll: true
};

export default Contractor;
