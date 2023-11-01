import { useEffect, useState } from 'react';

// project imports
import Api from 'constants/Api';
import sendRequest from 'services/ApiService';
import { IOption } from 'types';
import { Autocomplete } from 'components/extended/Form';

interface IReferencesProps {
    name: string;
    isDefaultAll?: boolean;
    required?: boolean;
    handleChange?: (data: any) => void;
}

const References = (props: IReferencesProps) => {
    const { name, isDefaultAll, required, handleChange } = props;

    const [memberReferences, setMemberReferences] = useState<IOption[]>([]);
    const [listMemberReferencesFilter, setListMemberReferencesFilter] = useState<any>([]);

    const handleChangeMemberReferences = (option: IOption) => {
        const memberInfoSelected = option ? listMemberReferencesFilter.filter((mem: any) => option.value === mem.idHexString) : null;
        handleChange && handleChange(memberInfoSelected ? memberInfoSelected[0] : null);
    };

    const getAllMemberReferences = async () => {
        const response: any = await sendRequest(Api.skills_manage.getReferences);

        if (response?.status) {
            const { result } = response;
            result.content.forEach((mem: any) => {
                let memberOption = {
                    value: mem.idHexString,
                    label: mem.fullName
                };
                setMemberReferences((mr) => [...mr, memberOption]);
                setListMemberReferencesFilter((prv: any) => [...prv, mem]);
            });
        } else return;
    };

    useEffect(() => {
        getAllMemberReferences();
    }, []);

    return (
        <Autocomplete
            required={required}
            handleChange={handleChangeMemberReferences}
            options={memberReferences}
            name={name}
            isDefaultAll={isDefaultAll}
        />
    );
};

export default References;
