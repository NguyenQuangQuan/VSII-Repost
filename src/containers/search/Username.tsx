import { FormattedMessage } from 'react-intl';

// project imports
import { Input } from 'components/extended/Form';
import { searchFormConfig } from './Config';

const Username = () => {
    return <Input name={searchFormConfig.userName.name} label={<FormattedMessage id={searchFormConfig.userName.label} />} />;
};

export default Username;
