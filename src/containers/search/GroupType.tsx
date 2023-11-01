import React from 'react';

// project imports
import { Select } from 'components/extended/Form';
import { searchFormConfig } from './Config';
import { DEFAULT_VALUE_OPTION, DEFAULT_VALUE_OPTION_SELECT, GROUP_TYPE } from 'constants/Common';

// third party
import { FormattedMessage } from 'react-intl';

interface IGroupTypeProps {
    isShowAll: boolean;
    required: boolean;
}

const GroupType = (props: IGroupTypeProps) => {
    const { isShowAll, required } = props;
    return (
        <>
            <Select
                required={required}
                selects={!isShowAll ? [DEFAULT_VALUE_OPTION, ...GROUP_TYPE] : [DEFAULT_VALUE_OPTION_SELECT, ...GROUP_TYPE]}
                name={searchFormConfig.groupType.name}
                label={<FormattedMessage id={searchFormConfig.groupType.label} />}
            />
        </>
    );
};

GroupType.defaultProps = {
    isShowAll: true,
    required: false
};

export default GroupType;
