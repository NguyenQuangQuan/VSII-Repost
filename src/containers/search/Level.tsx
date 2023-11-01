import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

// project imports
import { Select } from 'components/extended/Form';
import Api from 'constants/Api';
import { DEFAULT_VALUE_OPTION, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';
import sendRequest from 'services/ApiService';
import { ILevel, ILevelList, IOption, IResponseList } from 'types';
import { searchFormConfig } from './Config';

type ILevelProps = {
    isShowLabel?: boolean;
    name?: string;
    isShowAll?: boolean;
};

const Level = (props: ILevelProps) => {
    const { isShowLabel, name, isShowAll } = props;
    const [levels, setLevels] = useState<IOption[]>(isShowAll ? [DEFAULT_VALUE_OPTION] : [DEFAULT_VALUE_OPTION_SELECT]);

    async function getAllLevel() {
        const response: IResponseList<ILevelList> = await sendRequest(Api.master.getAllRank);
        const { status, result } = response;
        if (status) {
            result.content.forEach((level: ILevel) => {
                let option = {
                    value: level.rankName,
                    label: level.rankName
                };
                setLevels((levels) => [...levels, option]);
            });
        }
    }

    useEffect(() => {
        getAllLevel();
    }, []);

    return (
        <Select
            selects={levels}
            name={!name ? searchFormConfig.rankId.name : name}
            label={!isShowLabel && <FormattedMessage id={searchFormConfig.rankId.label} />}
        />
    );
};

export default Level;
