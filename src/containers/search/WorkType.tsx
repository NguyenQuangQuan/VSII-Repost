import { FormattedMessage } from 'react-intl';

// project imports
import { searchFormConfig } from './Config';
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION, WORK_TYPE, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';

interface IWorkTypeProps {
    isShowAll: boolean;
    required: boolean;
}

const WorkType = (props: IWorkTypeProps) => {
    const { isShowAll, required } = props;
    return (
        <>
            <Select
                isMultipleLanguage
                required={required}
                selects={!isShowAll ? [DEFAULT_VALUE_OPTION, ...WORK_TYPE] : [DEFAULT_VALUE_OPTION_SELECT, ...WORK_TYPE]}
                name={searchFormConfig.workType.name}
                label={<FormattedMessage id={searchFormConfig.workType.label} />}
            />
        </>
    );
};

WorkType.defaultProps = {
    isShowAll: false
};

export default WorkType;
