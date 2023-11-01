import { FormattedMessage } from 'react-intl';
// yup
import { yupResolver } from '@hookform/resolvers/yup';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, Grid, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';

// project imports
import { DatePicker, FormProvider, Input, NumericFormatCustom, PercentageFormat } from 'components/extended/Form';
import { MONEY_PLACEHOLDER, PERCENT_PLACEHOLDER } from 'constants/Common';
import { Billable, Department, Member, ProjectType, Status } from 'containers/search';
import { searchFormConfig } from 'containers/search/Config';
import { IProjectEditConfig, projectEditSchema } from 'pages/administration/Config';
import { useState } from 'react';

import { gridSpacing } from 'store/constant';
import { editLoadingSelector, editProject } from 'store/slice/projectSlice';
import { IProject } from 'types';
import { dateFormat } from 'utils/date';

interface IEditProjectFormProps {
    handleClose: () => void;
    projectDetail: IProject;
}

const EditProjectForm = (props: IEditProjectFormProps) => {
    const { handleClose, projectDetail } = props;
    const dispatch = useAppDispatch();
    const editLoading = useAppSelector(editLoadingSelector);
    const { projectManager } = projectDetail;
    const [projectDetailFormReset] = useState<IProjectEditConfig>({
        projectId: projectDetail.projectId,
        projectName: projectDetail.projectName,
        departmentId: projectDetail.deptId,
        contractNo: projectDetail.contractNo,
        billable: projectDetail.billable,
        projectType: projectDetail.typeCode,
        startDate: projectDetail.startDate,
        endDate: projectDetail.endDate,
        contractSize: projectDetail.contractSize,
        licenseAmount: projectDetail.licenseAmount,
        projectCostLimit: projectDetail.projectCostLimit,
        implementQuota: projectDetail.implementQuota,
        maintainQuota: projectDetail.maintainQuota,
        percentageComplete: +projectDetail.percentageComplete * 100,
        userName: !!projectManager
            ? { value: projectManager.userName, label: `${projectManager?.firstName} ${projectManager?.lastName}` }
            : projectManager,
        status: projectDetail.projectStatus,
        note: projectDetail.note ? projectDetail.note : ''
    });

    const handleEdit = (value: any) => {
        const { userName } = value;
        dispatch(
            editProject({
                ...value,
                userName: userName ? userName.value : null,
                startDate: dateFormat(value.startDate),
                endDate: dateFormat(value.endDate),
                percentageComplete: value.percentageComplete !== null ? +value.percentageComplete / 100 : null
            })
        );
        !editLoading && handleClose();
    };

    return (
        <FormProvider form={{ defaultValues: projectDetailFormReset, resolver: yupResolver(projectEditSchema) }} onSubmit={handleEdit}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} lg={6}>
                    <Input required name="projectId" label={<FormattedMessage id="project-id" />} disabled />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Input required name="projectName" label={<FormattedMessage id="project-name" />} />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Department required isShowAll={false} />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Input name="contractNo" label={<FormattedMessage id="contract-no" />} />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Billable required />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <ProjectType required />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <DatePicker required name="startDate" label={<FormattedMessage id="start-date" />} />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <DatePicker name="endDate" label={<FormattedMessage id="end-date" />} />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Input
                        textFieldProps={{
                            placeholder: MONEY_PLACEHOLDER,
                            InputProps: {
                                inputComponent: NumericFormatCustom as any
                            }
                        }}
                        name="contractSize"
                        label={<FormattedMessage id="contract-size" />}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Input
                        textFieldProps={{
                            placeholder: MONEY_PLACEHOLDER,
                            InputProps: {
                                inputComponent: NumericFormatCustom as any
                            }
                        }}
                        name="licenseAmount"
                        label={<FormattedMessage id="license-amount" />}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Input
                        textFieldProps={{
                            placeholder: MONEY_PLACEHOLDER,
                            InputProps: {
                                inputComponent: NumericFormatCustom as any
                            }
                        }}
                        name="projectCostLimit"
                        label={<FormattedMessage id="cost-limit" />}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Input
                        textFieldProps={{
                            placeholder: MONEY_PLACEHOLDER,
                            InputProps: {
                                inputComponent: NumericFormatCustom as any
                            }
                        }}
                        name="implementQuota"
                        label={<FormattedMessage id="implement-quota" />}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Input
                        textFieldProps={{
                            placeholder: MONEY_PLACEHOLDER,
                            InputProps: {
                                inputComponent: NumericFormatCustom as any
                            }
                        }}
                        name="maintainQuota"
                        label={<FormattedMessage id="maintainance-quota" />}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Input
                        textFieldProps={{
                            placeholder: PERCENT_PLACEHOLDER,
                            InputProps: {
                                inputComponent: PercentageFormat as any
                            }
                        }}
                        name="percentageComplete"
                        label={<FormattedMessage id="work-completed" />}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Member name={searchFormConfig.userName.name} label={<FormattedMessage id="project-manager" />} isShowAll={false} />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Status required isShowAll={false} isShowProjectStatus />
                </Grid>
                <Grid item xs={12}>
                    <Input name="note" label={<FormattedMessage id="note" />} textFieldProps={{ multiline: true, rows: 5 }} />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button color="error" onClick={handleClose}>
                            <FormattedMessage id="cancel" />
                        </Button>
                        <LoadingButton loading={editLoading} variant="contained" type="submit">
                            <FormattedMessage id="submit" />
                        </LoadingButton>
                    </Stack>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default EditProjectForm;
