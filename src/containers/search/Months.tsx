// third-party
import { FormattedMessage } from 'react-intl';

// project imports
import { Select, MultipleSelect } from 'components/extended/Form';
import { IOption } from 'types';
import { searchFormConfig } from './Config';
import { MONTH_SALARY_13TH_OPTION } from 'constants/Common';

interface IMonthsProps {
    disabled?: boolean;
    months: IOption[];
    isMultiple?: boolean;
    onChange?: (month: string) => void;
    isShow13MonthSalary: boolean;
    required?: boolean;
}

const Months = (props: IMonthsProps) => {
    const { disabled, months, isMultiple, onChange, isShow13MonthSalary, required } = props;

    const handleChange = (e: any) => {
        onChange && onChange(e);
    };

    return (
        <>
            {isMultiple ? (
                <MultipleSelect
                    selects={isShow13MonthSalary ? [...months, MONTH_SALARY_13TH_OPTION] : months}
                    name={searchFormConfig.month.name}
                    label={<FormattedMessage id={searchFormConfig.month.label} />}
                    isOrder
                    isMultipleLanguage={false}
                />
            ) : (
                <Select
                    disabled={disabled}
                    handleChange={handleChange}
                    selects={isShow13MonthSalary ? [...months, MONTH_SALARY_13TH_OPTION] : months}
                    name={searchFormConfig.month.name}
                    label={<FormattedMessage id={searchFormConfig.month.label} />}
                    required={required}
                />
            )}
        </>
    );
};

Months.defaultProps = {
    isShow13MonthSalary: false
};

export default Months;
