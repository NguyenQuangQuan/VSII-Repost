import { ChangeEvent, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

// project imports
import { Select } from 'components/extended/Form';
import { IOption } from 'types';
import { searchFormConfig } from './Config';
import { getNumberOfCurrentYears } from 'utils/date';

interface IYearsProps {
    disabled?: boolean;
    handleChangeYear?: (year: ChangeEvent<HTMLInputElement>) => void;
    reverse?: boolean;
}

const Years = (props: IYearsProps) => {
    const { disabled, handleChangeYear, reverse } = props;
    const [years, setYears] = useState<IOption[]>([]);
    const AMOUNT_RECENT_YEAR = 5;

    const handleChange = (e: any) => {
        handleChangeYear && handleChangeYear(e);
    };

    useEffect(() => {
        getNumberOfCurrentYears(AMOUNT_RECENT_YEAR, reverse).forEach((year) => {
            let recentYear = {
                value: year,
                label: String(year)
            };
            setYears((years) => [...years, recentYear]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            disabled={disabled}
            handleChange={handleChange}
            selects={years}
            name={searchFormConfig.year.name}
            label={reverse ? '' : <FormattedMessage id={searchFormConfig.year.label} />}
        />
    );
};

export default Years;
