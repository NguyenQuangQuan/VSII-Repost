import { FormattedMessage } from 'react-intl';

// project imports
import { DEGREE } from 'constants/Common';
import { searchFormConfig } from './Config';
import { MultipleSelect } from 'components/extended/Form';

const Degree = () => {
    return (
        <>
            <MultipleSelect
                isMultipleLanguage
                selects={DEGREE}
                name={searchFormConfig.degree.name}
                label={<FormattedMessage id={searchFormConfig.degree.label} />}
            />
        </>
    );
};

export default Degree;
