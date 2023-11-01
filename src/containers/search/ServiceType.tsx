import { FormattedMessage } from 'react-intl';

// project imports
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION, SERVICE_TYPE, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';

interface IServiceTypeProps {
    isShowAll?: boolean;
    required?: boolean;
    name: string;
    disabled?: boolean;
}

const ServiceType = (props: IServiceTypeProps) => {
    const { isShowAll, required, name, disabled } = props;
    return (
        <>
            <Select
                required={required}
                disabled={disabled}
                selects={!isShowAll ? [DEFAULT_VALUE_OPTION, ...SERVICE_TYPE] : [DEFAULT_VALUE_OPTION_SELECT, ...SERVICE_TYPE]}
                name={name}
                label={<FormattedMessage id="service-type" />}
            />
        </>
    );
};

ServiceType.defaultProps = {
    isShowAll: false,
    name: 'project.serviceType'
};

export default ServiceType;
