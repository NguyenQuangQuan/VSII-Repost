import React from 'react';

// project imports
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION, DEFAULT_VALUE_OPTION_SELECT, SALE_PIPELINE_ONGOING_STATUS } from 'constants/Common';
import { searchFormConfig } from './Config';

// third party
import { FormattedMessage } from 'react-intl';

interface ISalePipelineOnGoingStatusProps {
    name: string;
    required?: boolean;
    isShowAll?: boolean;
    disabled?: boolean;
}

const SalePipelineOnGoingStatus = (props: ISalePipelineOnGoingStatusProps) => {
    const { name, required, isShowAll, disabled } = props;
    return (
        <Select
            isMultipleLanguage
            disabled={disabled}
            required={required}
            selects={
                isShowAll
                    ? [DEFAULT_VALUE_OPTION, ...SALE_PIPELINE_ONGOING_STATUS]
                    : [DEFAULT_VALUE_OPTION_SELECT, ...SALE_PIPELINE_ONGOING_STATUS]
            }
            name={name}
            label={<FormattedMessage id={searchFormConfig.salePipelineOnGoingStatus.label} />}
        />
    );
};

SalePipelineOnGoingStatus.defaultProps = {
    name: searchFormConfig.salePipelineOnGoingStatus.name
};

export default SalePipelineOnGoingStatus;
