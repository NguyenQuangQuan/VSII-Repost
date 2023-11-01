import { FormattedMessage } from 'react-intl';

// project imports
import { searchFormConfig } from './Config';
import { Autocomplete } from 'components/extended/Form';
import { IOption, IResponseList, ITitleCode, ITitleResponse } from 'types';
import sendRequest from 'services/ApiService';
import Api from 'constants/Api';
import { ReactNode, useEffect, useState } from 'react';

interface ITitleCodeProps {
    name: string;
    label: string | ReactNode;
    isDefaultAll?: boolean;
    disabled: boolean;
    handleChange?: (data: any) => void;
    handleClose?: () => void;
    isFindAll: boolean;
    required?: boolean;
    isIdHexString?: boolean;
    isUserName?: boolean;
}

const TitleCode = (props: ITitleCodeProps) => {
    const { name, label, isDefaultAll, handleChange, handleClose, disabled, isFindAll, required } = props;
    const [titleCodes, setTitleCodes] = useState<IOption[]>([]);
    const [listUser, setListUser] = useState<ITitleCode[]>([]);
    const handleChangeTitleCode = (option: IOption) => {
        const userInfoSelected = option ? listUser.filter((data) => data.titleCode === option.value) : null;
        handleChange && handleChange(userInfoSelected ? userInfoSelected[0] : null);
    };
    async function getTitleCodes() {
        const response: IResponseList<ITitleResponse> = await sendRequest(Api.skills_manage.getTitleCodes, {
            findAll: isFindAll ? 'All' : ''
        });
        if (!response) return;
        const { status, result } = response;
        if (status) {
            result.content.forEach((item: ITitleCode) => {
                let titleCodeOption = {
                    value: item.titleCode,
                    label: `[${item.titleCode}] - ${item.titleName}`
                };
                setTitleCodes((item) => [...item, titleCodeOption]);
                setListUser((listUser) => [...listUser, item]);
            });
        }
    }

    useEffect(() => {
        getTitleCodes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Autocomplete
                required={required}
                options={titleCodes}
                name={name}
                label={label}
                handleChange={handleChangeTitleCode}
                handleClose={handleClose}
                disabled={disabled}
                isDefaultAll={isDefaultAll}
            />
        </>
    );
};

TitleCode.defaultProps = {
    name: searchFormConfig.titleCodeSkillReport.name,
    label: <FormattedMessage id={'title-code'} />,
    isShowAll: true,
    disabled: false,
    isFindAll: false
};

export default TitleCode;
