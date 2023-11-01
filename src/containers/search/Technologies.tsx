import React from 'react';

// project imports
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';
import { IOption } from 'types';
import { searchFormConfig } from './Config';

// material-ui
import { SelectChangeEvent } from '@mui/material';

interface ITechnologiesProps {
    name: string;
    technologies: IOption[];
    isShowAll: boolean;
    required?: boolean;
    handleChangeTechnologies?: (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => void;
}

const Technologies = (props: ITechnologiesProps) => {
    const { name, isShowAll, required, handleChangeTechnologies, technologies } = props;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => {
        handleChangeTechnologies && handleChangeTechnologies(e);
    };

    return (
        <Select
            required={required}
            handleChange={(e) => {
                handleChange && handleChange(e);
            }}
            isMultipleLanguage={false}
            selects={isShowAll ? [DEFAULT_VALUE_OPTION, ...technologies] : [DEFAULT_VALUE_OPTION_SELECT, ...technologies]}
            name={name}
        />
    );
};

Technologies.defaultProps = {
    name: searchFormConfig.technologies.name,
    isShowAll: true
};

export default Technologies;
