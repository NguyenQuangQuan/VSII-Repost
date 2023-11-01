import { FormattedMessage } from 'react-intl';

// project imports
import { Select } from 'components/extended/Form';
import Api from 'constants/Api';
import { DEFAULT_VALUE_OPTION } from 'constants/Common';
import { useEffect, useState } from 'react';
import sendRequest from 'services/ApiService';
import { IDepartment, IDepartmentList, IOption, IResponseList } from 'types';
import { searchFormConfig } from './Config';

interface IDepartmentProps {
    isShowAll: boolean;
    required?: boolean;
}

const Department = (props: IDepartmentProps) => {
    const { isShowAll, required } = props;
    const [department, setDepartment] = useState<IOption[]>(isShowAll ? [DEFAULT_VALUE_OPTION] : []);

    async function getAllDepartment() {
        const response: IResponseList<IDepartmentList> = await sendRequest(Api.department.getAll);
        if (response?.status) {
            const { result } = response;
            result.content.forEach((dept: IDepartment) => {
                let departmentOption = {
                    value: dept.deptId,
                    label: dept.deptId
                };
                setDepartment((department) => [...department, departmentOption]);
            });
        } else return;
    }

    useEffect(() => {
        getAllDepartment();
    }, []);

    return (
        <Select
            required={required}
            selects={department}
            name={searchFormConfig.department.name}
            label={<FormattedMessage id={searchFormConfig.department.label} />}
        />
    );
};

Department.defaultProps = {
    isShowAll: true
};

export default Department;
