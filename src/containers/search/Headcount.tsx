// project imports
import { Select } from 'components/extended/Form';
import { HEADCOUNT_OPTIONS } from 'constants/Common';
import { searchFormConfig } from './Config';

interface IHeadCountProps {
    required?: boolean;
}

const HeadCount = (props: IHeadCountProps) => {
    const { required } = props;
    return (
        <Select
            required={required}
            selects={HEADCOUNT_OPTIONS}
            name={searchFormConfig.headcount.name}
            label={searchFormConfig.headcount.label}
        />
    );
};

export default HeadCount;
