import { memo, useEffect, useState } from 'react';

// third party
import { FormattedMessage } from 'react-intl';

// project imports
import { Autocomplete } from 'components/extended/Form';
import Api from 'constants/Api';
import sendRequest from 'services/ApiService';
import { IOption, IProject, IProjectList, IResponseList } from 'types';
import { searchFormConfig } from './Config';

interface IProjectProps {
    name: string;
    disabled?: boolean;
    isDefaultAll?: boolean;
    isDisableClearable?: boolean;
    departmentId?: string;
    month?: any;
    isNotStatus?: boolean;
    required?: boolean;
    projectAuthorization?: string;
    week?: any;
}

const Project = (props: IProjectProps) => {
    const { name, isDefaultAll, disabled, isDisableClearable, departmentId, month, isNotStatus, required, projectAuthorization, week } =
        props;

    const [projects, setProjects] = useState<IOption[]>([]);

    const params = { ...month, ...week, projectAuthorization, departmentId, size: 1000, status: isNotStatus ? null : '1' };
    async function getAllProject() {
        const response: IResponseList<IProjectList> = await sendRequest(Api.project.getAll, params);
        if (!response) return;
        const { status, result } = response;
        if (status) {
            let arrOption: IOption[] = [];
            result.content.forEach((pro: IProject) => {
                let projectOption = {
                    value: pro.projectId,
                    label: pro.projectName,
                    typeCode: pro.typeCode
                };
                arrOption.push(projectOption);
            });
            setProjects(arrOption);
        }
    }

    useEffect(() => {
        getAllProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month, week]);

    return (
        <Autocomplete
            required={required}
            disabled={disabled}
            isDisableClearable={isDisableClearable}
            options={projects}
            name={name}
            label={<FormattedMessage id={searchFormConfig.project.label} />}
            groupBy={(option: IOption) => option.typeCode}
            isDefaultAll={isDefaultAll}
        />
    );
};

Project.defaultProps = {
    name: searchFormConfig.project.name,
    projectAuthorization: 'true'
};

export default memo(Project);
