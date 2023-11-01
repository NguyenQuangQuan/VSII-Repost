import { useEffect, useState } from 'react';

// project imports
import { Select } from 'components/extended/Form';
import Api from 'constants/Api';
import sendRequest from 'services/ApiService';
import { DEFAULT_VALUE_OPTION, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';
import { IOption } from 'types';

interface ISkillsProps {
    name: string;
    isShowAll: boolean;
    required?: boolean;
    techName: string;
}

const Skills = (props: ISkillsProps) => {
    const { name, isShowAll, required, techName } = props;

    const [skills, setSkills] = useState<IOption[]>(isShowAll ? [DEFAULT_VALUE_OPTION] : [DEFAULT_VALUE_OPTION_SELECT]);

    const getAllSkillByTech = async () => {
        if (techName === '') {
            setSkills(isShowAll ? [DEFAULT_VALUE_OPTION] : [DEFAULT_VALUE_OPTION_SELECT]);
            return;
        }
        const response = await sendRequest(Api.skills_manage.getSkillByTechnology, { techName });
        if (response?.status) {
            const { result } = response;
            const arrSkill: IOption[] = isShowAll ? [DEFAULT_VALUE_OPTION] : [DEFAULT_VALUE_OPTION_SELECT];
            result.content.forEach((item: any) => {
                let skillOption = {
                    value: item.skillName,
                    label: item.skillName
                };
                arrSkill.push(skillOption);
            });
            setSkills(arrSkill);
        }
    };

    useEffect(() => {
        getAllSkillByTech();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [techName]);

    return <Select required={required} isMultipleLanguage={false} selects={skills} name={name} />;
};

Skills.defaultProps = {
    isShowAll: false
};

export default Skills;
