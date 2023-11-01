import React, { useEffect, useState } from 'react';

// project imports
import Api from 'constants/Api';
import sendRequest from 'services/ApiService';
import { searchFormConfig } from './Config';
import { Autocomplete } from 'components/extended/Form';

// third party
import { FormattedMessage } from 'react-intl';
import { IOption, IProductionPerformanceItem, IProductionPerformanceList, IResponseList } from 'types';

interface IProductionPerformanceProps {
    name: string;
    label: string;
    disabled?: boolean;
    isDefaultAll?: boolean;
    required?: boolean;
    handleChange?: (data: any) => void;
    year?: number;
}

const ProductionPerformance = (props: IProductionPerformanceProps) => {
    const { name, disabled, isDefaultAll, required, handleChange, label, year } = props;
    const [projects, setProjects] = useState<IOption[]>([]);
    const [listProject, setListProject] = useState<IProductionPerformanceItem[]>([]);
    let currentYear = new Date().getFullYear();

    const handleChangeProject = (option: IOption) => {
        const projectSelected = option ? listProject.filter((pro) => pro.idHexString === option.value) : null;
        handleChange && handleChange(projectSelected ? projectSelected[0] : null);
    };

    const getAllProductionPerformance = async () => {
        const params = { year: year ? year : currentYear };
        const response: IResponseList<IProductionPerformanceList> = await sendRequest(Api.master.getProductionPerformanceAll, params);
        if (!response) return;
        const { status, result } = response;
        if (status) {
            result.content.forEach((pro) => {
                let projectOption = {
                    value: pro.idHexString,
                    label: pro.project.projectName
                };
                setProjects((projects) => [...projects, projectOption]);
                setListProject((listPro) => [...listPro, pro]);
            });
        }
    };

    useEffect(() => {
        setProjects([]);
        getAllProductionPerformance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    return (
        <Autocomplete
            required={required}
            disabled={disabled}
            options={projects}
            name={name}
            label={<FormattedMessage id={label} />}
            isDefaultAll={isDefaultAll}
            handleChange={handleChangeProject}
        />
    );
};

ProductionPerformance.defaultProps = {
    name: searchFormConfig.productionPerformance.name,
    label: searchFormConfig.productionPerformance.label,
    isDefaultAll: true
};

export default ProductionPerformance;
