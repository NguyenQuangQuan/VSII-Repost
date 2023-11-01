import { FormattedMessage } from 'react-intl';

// project imports
import { Input } from 'components/extended/Form';
import { searchFormConfig } from './Config';

const MemberCode = () => {
    return <Input name={searchFormConfig.memberCode.name} label={<FormattedMessage id={searchFormConfig.memberCode.label} />} />;
};

export default MemberCode;
