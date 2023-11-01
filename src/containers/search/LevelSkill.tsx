import { FormattedMessage } from 'react-intl';

// project imports
import { LEVEL } from 'constants/Common';
import { searchFormConfig } from './Config';
import { MultipleSelect } from 'components/extended/Form';

const LevelSkill = () => {
    return (
        <>
            <MultipleSelect
                isMultipleLanguage
                selects={LEVEL}
                name={searchFormConfig.levelSKill.name}
                label={<FormattedMessage id={searchFormConfig.levelSKill.label} />}
            />
        </>
    );
};

export default LevelSkill;
