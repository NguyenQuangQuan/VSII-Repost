import React from 'react';

// project imports
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION, DEFAULT_VALUE_OPTION_SELECT, SALE_PIPELINE_ONGOING_TYPE } from 'constants/Common';
import { searchFormConfig } from './Config';

// third party
import { FormattedMessage } from 'react-intl';

interface ISalePipelineOnGoingTypeProps {
    name: string;
    required?: boolean;
    isShowAll?: boolean;
    label?: string;
    disabled?: boolean;
}

const SalePipelineOnGoingStatus = (props: ISalePipelineOnGoingTypeProps) => {
    const { name, required, isShowAll, disabled, label } = props;
    return (
        <Select
            required={required}
            disabled={disabled}
            isMultipleLanguage
            selects={
                isShowAll
                    ? [DEFAULT_VALUE_OPTION, ...SALE_PIPELINE_ONGOING_TYPE]
                    : [DEFAULT_VALUE_OPTION_SELECT, ...SALE_PIPELINE_ONGOING_TYPE]
            }
            name={name}
            label={<FormattedMessage id={label} />}
        />
    );
};

SalePipelineOnGoingStatus.defaultProps = {
    name: searchFormConfig.salePipelineOnGoingType.name,
    label: searchFormConfig.type.label
};

export default SalePipelineOnGoingStatus;
