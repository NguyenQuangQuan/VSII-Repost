import { FormattedMessage } from 'react-intl';
import { memo, useEffect, useState } from 'react';

// project imports
import { searchFormConfig } from './Config';
import { IOption, IResponseList, ITechs, ITechsResponse } from 'types';
import sendRequest from 'services/ApiService';
import Api from 'constants/Api';
import { Autocomplete } from 'components/extended/Form';

const Skill = () => {
    const [techs, setTechs] = useState<IOption[]>([]);
    async function getAllTech() {
        const response: IResponseList<ITechsResponse> = await sendRequest(Api.skills_manage.getTechAll);
        if (!response) return;
        const { status, result } = response;
        if (status) {
            let arrOption: IOption[] = [];
            result.content.forEach((tech: ITechs) => {
                let techOption = {
                    value: tech.name,
                    label: tech.name,
                    typeCode: tech.type
                };
                arrOption.push(techOption);
            });
            setTechs(arrOption);
        }
    }

    useEffect(() => {
        getAllTech();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Autocomplete
                multiple
                name={searchFormConfig.skill.name}
                label={<FormattedMessage id={searchFormConfig.skill.label} />}
                options={techs}
                groupBy={(option: IOption) => option.typeCode}
            />
        </>
    );
};

export default memo(Skill);
