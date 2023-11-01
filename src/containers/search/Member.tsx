/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

// project imports
import { Autocomplete } from 'components/extended/Form';
import Api from 'constants/Api';
import { E_IS_LOGTIME, STATUS_USER } from 'constants/Common';
import sendRequest from 'services/ApiService';
import { IMember, IMemberList, IOption, IResponseList } from 'types';
import { searchFormConfig } from './Config';

interface IMemberProps {
    name: string;
    label: string | ReactNode;
    isDefaultAll?: boolean;
    disabled: boolean;
    handleChange?: (data: any) => void;
    handleClose?: () => void;
    isLogTime: E_IS_LOGTIME;
    isFindAll: boolean;
    required?: boolean;
    isIdHexString?: boolean;
    isUserName?: boolean;
}

const Member = (props: IMemberProps) => {
    const { name, label, isDefaultAll, handleChange, handleClose, disabled, isLogTime, isFindAll, required, isIdHexString, isUserName } =
        props;
    const [members, setMembers] = useState<IOption[]>([]);
    const [listUser, setListUser] = useState<IMember[]>([]);
    const handleChangeMember = (option: IOption) => {
        const userInfoSelected = option
            ? listUser.filter((user) =>
                isIdHexString
                    ? user.idHexString === option.value
                    : isUserName
                        ? user.userName === option.value
                        : user.userId === option.value
            )
            : null;
        handleChange && handleChange(userInfoSelected ? userInfoSelected[0] : null);
    };

    async function getAllMember() {
        const response: IResponseList<IMemberList> = await sendRequest(Api.master.findAllUserLoginTime, {
            status: STATUS_USER.active,
            logtime: isLogTime,
            findAll: isFindAll ? 'All' : ''
        });

        if (response) {
            const { status, result } = response;
            if (status) {
                result.content.forEach((member: IMember) => {
                    let memberOption = {
                        value:
                            name === searchFormConfig.userName.name ||
                                name === searchFormConfig.picUserName.name ||
                                name === searchFormConfig.projectManager.name || isUserName
                                ? member.userName
                                : name === searchFormConfig.idHexString.name || isIdHexString
                                    ? member.idHexString!
                                    : member.userId,
                        label: `${member.firstName} ${member.lastName}`
                    };

                    setMembers((members) => [...members, memberOption]);
                    setListUser((listUser) => [...listUser, member]);
                });
            }
        }
    }

    useEffect(() => {
        getAllMember();
    }, []);

    return (
        <Autocomplete
            required={required}
            options={members}
            name={name}
            label={label}
            handleChange={handleChangeMember}
            handleClose={handleClose}
            disabled={disabled}
            isDefaultAll={isDefaultAll}
        />
    );
};

Member.defaultProps = {
    name: searchFormConfig.userId.name,
    label: <FormattedMessage id={searchFormConfig.userId.label} />,
    isShowAll: true,
    disabled: false,
    isLogTime: E_IS_LOGTIME.ALL,
    isFindAll: false
};

export default Member;
