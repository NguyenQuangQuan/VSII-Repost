import { FormattedMessage } from 'react-intl';

// yup
import { yupResolver } from '@hookform/resolvers/yup';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, Grid, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';

// project imports
import { DatePicker, FormProvider, Input } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { HeadCount, Member } from 'containers/search';
import { saveOrUpdateProjectUserConfig, saveOrUpdateProjectUserSchema } from 'pages/administration/Config';
import { gridSpacing } from 'store/constant';
import { editLoadingProjectUserSelector, projectDetailSelector, saveOrUpdateProjectUser } from 'store/slice/projectSlice';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { IMember } from 'types';
import { dateFormat } from 'utils/date';

interface IAddOrEditProjectUserProps {
    open: boolean;
    handleClose: () => void;
    isEdit: boolean;
    user?: any;
    setUser: React.Dispatch<any>;
    handleCloseMember: () => void;
}

const AddOrEditProjectUser = (props: IAddOrEditProjectUserProps) => {
    const dispatch = useAppDispatch();
    const projectDetail = useAppSelector(projectDetailSelector);
    const { open, handleClose, user, isEdit, setUser, handleCloseMember } = props;
    const editLoadingProjectUser = useAppSelector(editLoadingProjectUserSelector);

    const handleChangeMember = (userSelected: IMember) => {
        userSelected &&
            setUser({
                ...user,
                userId: { value: userSelected.userId, label: `${userSelected.firstName} ${userSelected.lastName}` },
                userName: userSelected.userName,
                memberCode: userSelected.memberCode,
                lastName: userSelected.lastName,
                firstName: userSelected.firstName
            });
    };

    const handleSubmit = (values: any) => {
        const { userId, fromDate, toDate } = values;
        if (values.userName === '') {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Please enter User',
                    variant: 'alert',
                    alert: { color: 'error' }
                })
            );
        } else {
            dispatch(
                saveOrUpdateProjectUser({
                    ...values,
                    projectId: +values.projectId,
                    userId: +userId.value,
                    fromDate: dateFormat(fromDate),
                    toDate: toDate ? dateFormat(toDate) : toDate,
                    isEdit
                })
            );
            !editLoadingProjectUser && handleClose();
        }
    };

    return (
        <Modal isOpen={open} title={isEdit ? 'edit-headcount' : 'add-headcount'} onClose={handleClose} keepMounted={false}>
            <FormProvider
                form={{ defaultValues: saveOrUpdateProjectUserConfig, resolver: yupResolver(saveOrUpdateProjectUserSchema) }}
                onSubmit={handleSubmit}
                formReset={{
                    ...user,
                    userId: !!user.userId
                        ? { value: isEdit ? user.userId : user.userId.value, label: `${user.firstName} ${user.lastName}` }
                        : user.userId,
                    projectId: projectDetail?.project.projectId,
                    projectName: projectDetail?.project.projectName,
                    projectType: projectDetail?.project.typeCode
                }}
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={6}>
                        <Member
                            label="User"
                            handleChange={handleChangeMember}
                            handleClose={handleCloseMember}
                            disabled={isEdit}
                            isShowAll={false}
                            isFindAll
                            isIdHexString={true}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Input name="memberCode" label="Member Code" disabled />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Input name="userName" label="Username" disabled />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Input name="firstName" label="First name" disabled />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Input name="lastName" label="Last name" disabled />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <HeadCount required />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <DatePicker required name="fromDate" label="From date" />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <DatePicker name="toDate" label="To date" />
                    </Grid>
                    <Grid item xs={12}>
                        <DialogActions>
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <Button color="error" onClick={handleClose}>
                                    <FormattedMessage id="cancel" />
                                </Button>
                                <LoadingButton loading={editLoadingProjectUser} variant="contained" type="submit">
                                    <FormattedMessage id="submit" />
                                </LoadingButton>
                            </Stack>
                        </DialogActions>
                    </Grid>
                </Grid>
            </FormProvider>
        </Modal>
    );
};

export default AddOrEditProjectUser;
