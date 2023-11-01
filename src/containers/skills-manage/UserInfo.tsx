/* eslint-disable prettier/prettier */

// material-ui
import { Grid, useTheme } from '@mui/material';

// react-hook-form
import { useFormContext } from 'react-hook-form';

// project-import
import MainCard from 'components/cards/MainCard';
import { Input } from 'components/extended/Form';
import { Member, Status } from 'containers/search';
import { gridSpacing } from 'store/constant';
import { IMember } from 'types';

interface IUserInfoProps {
    isUpdate?: boolean;
}

const UserInfo = (props: IUserInfoProps) => {
    const { isUpdate } = props;
    const { setValue } = useFormContext()
    const theme = useTheme();

    const handleChange = (memberInfo: IMember) => {
        setValue('personalDetail', memberInfo ? {
            fullNameEn: `${memberInfo.firstName} ${memberInfo.lastName}`,
            firstName: memberInfo.firstName,
            lastName: memberInfo.lastName,
            memberCode: memberInfo.memberCode,
            department: memberInfo.departmentId,
            title: memberInfo.titleCode,
            status: memberInfo.status,
            userName: memberInfo?.userName
        } : {
            fullNameEn: '',
            firstName: '',
            lastName: '',
            memberCode: '',
            department: '',
            title: '',
            status: '',
            userName: ''
        })
    };

    return (
        <MainCard sx={{ marginBottom: theme.spacing(gridSpacing) }} title="User Info">
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={2.4}>
                    <Member isDefaultAll={true} name="personalDetail.idHexStringUser" handleChange={handleChange} required disabled={isUpdate} isFindAll isIdHexString />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Input name="personalDetail.memberCode" label="Member Code" disabled />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Input name="personalDetail.department" label="department" disabled />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Input name="personalDetail.title" label="title" disabled />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Status name="personalDetail.status" disabled isShowAll={false} />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default UserInfo;
