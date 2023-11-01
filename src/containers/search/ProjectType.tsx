import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

// project imports
import Api from 'constants/Api';
import sendRequest from 'services/ApiService';
import { IOption, IProjectType, IProjectTypeList, IResponseList } from 'types';
import { Select } from 'components/extended/Form';
import { searchFormConfig } from './Config';
import { DEFAULT_VALUE_OPTION } from 'constants/Common';

interface IProjectTypeProps {
    name: string;
    required?: boolean;
}

const ProjectType = ({ name, required }: IProjectTypeProps) => {
    const [projectType, setProjectType] = useState<IOption[]>([DEFAULT_VALUE_OPTION]);

    async function getAllProjectType() {
        const response: IResponseList<IProjectTypeList> = await sendRequest(Api.master.getProjectType);
        if (!response) return;
        const { status, result } = response;
        if (status) {
            result.content.forEach((proType: IProjectType) => {
                let projectTypeOption = {
                    value: proType.typeCode,
                    label: proType.projectTypeName
                };
                setProjectType((projectType) => [...projectType, projectTypeOption]);
            });
        }
    }

    useEffect(() => {
        getAllProjectType();
    }, []);

    return (
        <Select
            required={required}
            selects={projectType}
            name={name}
            label={<FormattedMessage id={searchFormConfig.projectType.label} />}
        />
    );
};

ProjectType.defaultProps = {
    name: searchFormConfig.projectType.name
};

export default ProjectType;
