import { FormattedMessage } from 'react-intl';

// project imports
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION_SELECT, PRODUCTIVITY_TYPE } from 'constants/Common';
import { searchFormConfig } from './Config';

interface IProductivityType {
    required?: boolean;
}

const ProductivityType = (props: IProductivityType) => {
    const { required } = props;
    return (
        <Select
            required={required}
            isMultipleLanguage={false}
            selects={[DEFAULT_VALUE_OPTION_SELECT, ...PRODUCTIVITY_TYPE]}
            name={searchFormConfig.productivityType.name}
            label={<FormattedMessage id={searchFormConfig.productivityType.label} />}
        />
    );
};

export default ProductivityType;
