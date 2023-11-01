// project imports
import { Select } from 'components/extended/Form';
import { STATUS, STATUS_PROJECT_OPTIONS } from 'constants/Common';
import { searchFormConfig } from './Config';
import { FormattedMessage } from 'react-intl';

interface IStatusProps {
    name: string;
    isShowAll?: boolean;
    isShowProjectStatus: boolean;
    required?: boolean;
    disabled?: boolean;
}

const Status = (props: IStatusProps) => {
    const { isShowAll, isShowProjectStatus, required, name, disabled } = props;
    let statusOptions = isShowAll ? STATUS : STATUS.filter((el) => el.value);
    if (isShowProjectStatus) statusOptions = isShowAll ? STATUS_PROJECT_OPTIONS : STATUS_PROJECT_OPTIONS.filter((el) => el.value);

    return (
        <Select
            isMultipleLanguage
            required={required}
            selects={statusOptions}
            disabled={disabled}
            name={name}
            label={<FormattedMessage id={searchFormConfig.status.label} />}
        />
    );
};

Status.defaultProps = {
    isShowAll: true,
    name: searchFormConfig.status.name,
    isShowProjectStatus: false
};

export default Status;
