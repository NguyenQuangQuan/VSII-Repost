// project imports
import { Select } from 'components/extended/Form';
import Api from 'constants/Api';
import { DEFAULT_VALUE_OPTION, DEFAULT_VALUE_OPTION_SELECT } from 'constants/Common';
import { useEffect, useState } from 'react';
import sendRequest from 'services/ApiService';
import { ITitle, ITitleList, IOption, IResponseList } from 'types';
import { searchFormConfig } from './Config';
import { FormattedMessage } from 'react-intl';

interface ITitleProps {
    isShowAll: boolean;
    isShowLabel?: boolean;
    name?: string;
}

const Title = (props: ITitleProps) => {
    const { isShowAll, isShowLabel, name } = props;
    const [titles, setTitles] = useState<IOption[]>(isShowAll ? [DEFAULT_VALUE_OPTION] : [DEFAULT_VALUE_OPTION_SELECT]);

    async function getAllTitle() {
        const response: IResponseList<ITitleList> = await sendRequest(Api.master.getAllTitle);
        if (response?.status) {
            const { result } = response;
            result.content.forEach((title: ITitle) => {
                let option = {
                    value: title.titleCode,
                    label: `[${title.titleCode}] - ${title.titleName}`
                };
                setTitles((titles) => [...titles, option]);
            });
        } else return;
    }

    useEffect(() => {
        getAllTitle();
    }, []);

    return (
        <Select
            selects={titles}
            name={!name ? searchFormConfig.titleCode.name : name}
            label={!isShowLabel && <FormattedMessage id={searchFormConfig.titleCode.label} />}
        />
    );
};

Title.defaultProps = {
    isShowAll: true
};

export default Title;
