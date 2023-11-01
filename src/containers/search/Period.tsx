import { FormattedMessage } from 'react-intl';

// project imports
import { Select } from 'components/extended/Form';
import { PERIOD } from 'constants/Common';
import { searchFormConfig } from './Config';
interface IPeriodProps {
    handleChangePeriod: (period: any) => void;
}

const Period = ({ handleChangePeriod }: IPeriodProps) => {
    const handleChange = (e: any) => {
        handleChangePeriod(e);
    };

    return (
        <Select
            isMultipleLanguage
            handleChange={handleChange}
            selects={PERIOD}
            name={searchFormConfig.period.name}
            label={<FormattedMessage id={searchFormConfig.period.label} />}
        />
    );
};

export default Period;
