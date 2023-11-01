import { FormattedMessage } from 'react-intl';

// project imports
import { Input } from 'components/extended/Form';

interface NameProps {
    name: string;
    label: string;
}
const Name = (props: NameProps) => {
    const { name, label } = props;
    return <Input name={name} label={<FormattedMessage id={label} />} />;
};

export default Name;
