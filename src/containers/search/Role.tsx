// third party
import { FormattedMessage } from 'react-intl';

// material-ui
import { SelectChangeEvent } from '@mui/material';

// project imports
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION_SELECT, ROLE_TYPE } from 'constants/Common';
import { searchFormConfig } from './Config';

interface IRoleProps {
    disabled?: boolean;
    handleChange?: (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => void;
    isShowName?: string;
    isShowLabel?: boolean;
}

const Role = (props: IRoleProps) => {
    const { disabled, handleChange, isShowName, isShowLabel } = props;
    return (
        <Select
            disabled={disabled}
            selects={[DEFAULT_VALUE_OPTION_SELECT, ...ROLE_TYPE]}
            handleChange={handleChange}
            name={!isShowName ? searchFormConfig.roleType.name : isShowName}
            label={!isShowLabel && <FormattedMessage id={searchFormConfig.roleType.label} />}
        />
    );
};

export default Role;
