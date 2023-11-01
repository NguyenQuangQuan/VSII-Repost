// third party
import { FormattedMessage } from 'react-intl';

// material-ui
import { SelectChangeEvent } from '@mui/material';

// project imports
import { Select } from 'components/extended/Form';
import { CONTRACT_TYPE, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';
import { searchFormConfig } from './Config';

interface IContractTypeProps {
    disabled?: boolean;
    required?: boolean;
    isShowAll?: boolean;
    name: string;
    handleChange?: (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => void;
}

const ContractType = (props: IContractTypeProps) => {
    const { disabled, required, isShowAll, name, handleChange } = props;

    return (
        <Select
            required={required}
            disabled={disabled}
            selects={!isShowAll ? CONTRACT_TYPE : [DEFAULT_VALUE_OPTION_SELECT, ...CONTRACT_TYPE]}
            name={name}
            handleChange={handleChange}
            label={<FormattedMessage id={searchFormConfig.contractType.label} />}
        />
    );
};

ContractType.defaultProps = {
    isShowAll: false,
    name: searchFormConfig.contractType.name
};

export default ContractType;
