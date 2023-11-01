// third party
import { FormattedMessage } from 'react-intl';

// material-ui
import { SelectChangeEvent } from '@mui/material';

// project imports
import { Select } from 'components/extended/Form';
import { DATA_SOURCE } from 'constants/Common';
import { searchFormConfig } from './Config';

interface IDataSourceProps {
    disabled?: boolean;
    required?: boolean;
    name: string;
    handleChange?: (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => void;
}

const DataSource = (props: IDataSourceProps) => {
    const { disabled, required, name, handleChange } = props;

    return (
        <Select
            required={required}
            disabled={disabled}
            selects={DATA_SOURCE}
            name={name}
            handleChange={handleChange}
            label={<FormattedMessage id={searchFormConfig.dataSource.label} />}
        />
    );
};

DataSource.defaultProps = {
    name: searchFormConfig.dataSource.name
};

export default DataSource;
