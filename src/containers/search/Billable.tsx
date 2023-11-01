// project imports
import { Select } from 'components/extended/Form';
import { BILLABLE_OPTIONS } from 'constants/Common';
import { searchFormConfig } from './Config';

interface IBillableProps {
    required?: boolean;
}
const Billable = ({ required }: IBillableProps) => {
    return (
        <Select
            required={required}
            selects={BILLABLE_OPTIONS}
            name={searchFormConfig.billable.name}
            label={searchFormConfig.billable.label}
        />
    );
};

export default Billable;
