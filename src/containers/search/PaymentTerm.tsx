// third party
import { FormattedMessage } from 'react-intl';

// material-ui
import { SelectChangeEvent } from '@mui/material';

// project imports
import { Select } from 'components/extended/Form';
import { PAYMENT_TERM } from 'constants/Common';
import { searchFormConfig } from './Config';

interface IPaymentTermProps {
    disabled?: boolean;
    handleChange?: (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => void;
    required?: boolean;
}

const PaymentTerm = (props: IPaymentTermProps) => {
    const { disabled, handleChange, required } = props;
    return (
        <Select
            required={required}
            disabled={disabled}
            selects={PAYMENT_TERM}
            handleChange={handleChange}
            name={searchFormConfig.paymentTermType.name}
            label={<FormattedMessage id={searchFormConfig.paymentTermType.label} />}
        />
    );
};

export default PaymentTerm;
