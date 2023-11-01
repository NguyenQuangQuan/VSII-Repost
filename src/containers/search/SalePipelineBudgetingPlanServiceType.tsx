import React from 'react';

// project imports
import { Select } from 'components/extended/Form';
import { DEFAULT_VALUE_OPTION, DEFAULT_VALUE_OPTION_SELECT, SALE_PIPELINE_BUDGETING_PLAN_SERVICE_TYPE } from 'constants/Common';
import { searchFormConfig } from './Config';

// third party
import { FormattedMessage } from 'react-intl';

interface ISalePipelineDubgetingPlanServiceTypeProps {
    name: string;
    required?: boolean;
    isShowAll?: boolean;
    disabled?: boolean;
}

const BudgetingPlanServiceType = (props: ISalePipelineDubgetingPlanServiceTypeProps) => {
    const { name, required, isShowAll, disabled } = props;
    return (
        <Select
            required={required}
            disabled={disabled}
            isMultipleLanguage
            selects={
                isShowAll
                    ? [DEFAULT_VALUE_OPTION, ...SALE_PIPELINE_BUDGETING_PLAN_SERVICE_TYPE]
                    : [DEFAULT_VALUE_OPTION_SELECT, ...SALE_PIPELINE_BUDGETING_PLAN_SERVICE_TYPE]
            }
            name={name}
            label={<FormattedMessage id={searchFormConfig.salePipelineBudgetingPlanServiceType.label} />}
        />
    );
};

BudgetingPlanServiceType.defaultProps = {
    name: searchFormConfig.salePipelineOnGoingType.name
};

export default BudgetingPlanServiceType;
