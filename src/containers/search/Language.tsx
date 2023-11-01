// project imports
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';
import { IOption } from 'types';
import { searchFormConfig } from './Config';

interface ILanguageProps {
    name: string;
    isShowAll: boolean;
    languageSelect: IOption[];
    required?: boolean;
    handleChangeLanguage: (e: any) => void;
}

const Language = (props: ILanguageProps) => {
    const { name, isShowAll, required, languageSelect, handleChangeLanguage } = props;

    return (
        <Select
            required={required}
            handleChange={handleChangeLanguage}
            selects={isShowAll ? [DEFAULT_VALUE_OPTION, ...languageSelect] : [DEFAULT_VALUE_OPTION_SELECT, ...languageSelect]}
            name={name}
        />
    );
};

Language.defaultProps = {
    name: searchFormConfig.language.name,
    isShowAll: true
};

export default Language;
