// material-ui
import { SelectChangeEvent } from '@mui/material';
// project imports
import { Select } from 'components/extended/Form';
import { IOption } from 'types';
import { searchFormConfig } from './Config';
import { FormattedMessage } from 'react-intl';

interface IWeeksProps {
    weeks: IOption[];
    onChange?: (week: string) => void;
}

const Weeks = (props: IWeeksProps) => {
    const { weeks, onChange } = props;
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => {
        const value = e.target.value;
        onChange && onChange(value as string);
    };

    return (
        <Select
            selects={weeks}
            handleChange={handleChange}
            name={searchFormConfig.week.name}
            label={<FormattedMessage id={searchFormConfig.week.label} />}
        />
    );
};

export default Weeks;
