import React, { SyntheticEvent, startTransition, useEffect, useState } from 'react';

// react-hook-form
import { useFieldArray, useForm } from 'react-hook-form';

// third-party
import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage, useIntl } from 'react-intl';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, CircularProgress, DialogActions, Grid, IconButton, Stack, TableBody, TableContainer, Tooltip } from '@mui/material';

// assets
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// project imports
import { Checkbox, CheckboxGroup, FormProvider, Input, Radio } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { Table } from 'components/extended/Table';
import { TabPanel } from 'components/extended/Tabs';
import Api from 'constants/Api';
import {
    DATE_FORMAT,
    FIELD_BY_TAB_USERS,
    GROUP_OPTION_CONFIG,
    PROJECT_OPTION_CONFIG,
    PROJECT_PERMISSION_OPTIONS,
    addOrEditUserTabs
} from 'constants/Common';
import { TabCustom } from 'containers';
import { Department, Status } from 'containers/search';
import {
    editOnboardHistoryFormSchema,
    userBillableFormDefault,
    userOnboardHistoryFormDefault,
    userRankHistoryFormDefault
} from 'pages/administration/Config';
import sendRequest from 'services/ApiService';
import { gridSpacing } from 'store/constant';
import {
    IGroup,
    IGroupList,
    IMember,
    IProjectList,
    IResponseList,
    IUserBillableHistory,
    IUserOnboardHistory,
    IUserRankHistory
} from 'types';
import { getTabValueByFieldError } from 'utils/common';
import { dateFormat } from 'utils/date';
import FieldsOnboardHistoryTableTBody from './FieldsOnboardTableTBody';
import FieldsOnboardHistoryTableTHead from './FieldsOnboardTableTHead';
import FieldsRankHistoryTableTBody from './FieldsRankTableTBody';
import FieldRankHistoryTableTHead from './FieldsRankTableTHead';
import UserBillableHistoryTableTBody from './UserBillableTableTBody';
import UserBillableTableTHead from './UserBillableTableTHead';

// ==============================|| ADD NEW USER ||============================== //

interface IAddOrEditUserProps {
    user: IMember;
    loading?: boolean;
    open: boolean;
    isEdit: boolean;
    handleClose: () => void;
    addUser: (user: IMember) => void;
    editUser: (user: IMember) => void;
}

const AddOrEditUser = ({ user, loading, open, isEdit, handleClose, addUser, editUser }: IAddOrEditUserProps) => {
    const [tabValue, setTabValue] = useState(0);
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [groupByFilters, setGroupByFilters] = useState<IGroup[]>([]);
    const [projects, setProjects] = useState<{ projectId: number; projectName: string }[]>([]);
    const [projectByFilters, setProjectByFilters] = useState<{ projectId: number; projectName: string }[]>([]);
    const [loadingProject, setLoadingProject] = useState<boolean>(true);
    const [typeProjectPermission, setTypeProjectPermission] = useState<string | undefined>(
        isEdit ? user.projectPermissionEntity?.type : 'Assigned'
    );
    const intl = useIntl();

    // Functions
    async function getAllGroup() {
        const response: IResponseList<IGroupList> = await sendRequest(Api.master.getAllGroup);
        if (response) {
            const { status, result } = response;
            if (status) {
                setGroups(result.content as IGroup[]);
                setGroupByFilters(result.content as IGroup[]);
            }
        }
    }

    async function getAllProject() {
        setLoadingProject(false);
        const response: IResponseList<IProjectList> = await sendRequest(Api.project.getAll, { size: 1000, projectAuthorization: 'false' });
        if (response) {
            const { status, result } = response;
            if (status) {
                const projectList = result.content?.map((pro) => {
                    return { projectId: pro.projectId, projectName: pro.projectName };
                });
                setProjects(projectList);
                setProjectByFilters(projectList);
            }
        }
        setLoadingProject(true);
    }

    // Sắp xếp lại projects : Các dự án member xem được thông tin sẽ được đẩy lên đầu checkbox
    const isProjectAssigned = (projectId: number) => {
        return user?.projectPermissionEntity?.assignedProjectList?.some((assignedProject) => assignedProject.projectId === projectId);
    };

    const sortProjectByPermission = (allProjects: Array<{ projectId: number; projectName: string }>) => {
        const assignedProjects: Array<{ projectId: number; projectName: string }> = [];
        const unassignedProjects: Array<{ projectId: number; projectName: string }> = [];

        allProjects.forEach((project) => {
            if (isProjectAssigned(project.projectId)) {
                assignedProjects.push(project);
            } else {
                unassignedProjects.push(project);
            }
        });

        return [...assignedProjects, ...unassignedProjects];
    };

    const userOnboardHistory: IUserOnboardHistory[] | undefined = user?.userOnboardHistoryList?.map((item: IUserOnboardHistory) => ({
        fromDate: item.fromDate,
        toDate: item.toDate,
        contractor: item.contractor === 'Yes' ? true : false
    }));

    const userRankHistory: IUserRankHistory[] | undefined = user?.userRankHistoryList?.map((item: IUserRankHistory) => ({
        fromDate: item.fromDate,
        toDate: item.toDate,
        rankId: item.rankId,
        titleCode: item.titleCode
    }));

    const userBillableHistory: IUserBillableHistory[] | undefined = user?.userBillableHistoryList?.map((item: IUserBillableHistory) => ({
        fromDate: item.fromDate,
        toDate: item.toDate
    }));

    // useForm
    const methods = useForm({
        defaultValues: {
            memberCode: user.memberCode,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            departmentId: user.departmentId,
            status: user.status,
            logtime: user.logtime,
            userOnboardHistoryList: isEdit ? userOnboardHistory : [userOnboardHistoryFormDefault],
            userRankHistoryList: isEdit ? userRankHistory : [userRankHistoryFormDefault],
            userBillableHistoryList: isEdit ? userBillableHistory : [userBillableFormDefault],
            groups: user.groups,
            projectPermissionEntity: isEdit ? user?.projectPermissionEntity : { type: typeProjectPermission }
        },
        resolver: yupResolver(editOnboardHistoryFormSchema),
        mode: 'all'
    });

    const { errors } = methods.formState;

    // rank
    const {
        fields: fieldsRankHistory,
        append: appendRankHistory,
        remove: removeRankHistory
    } = useFieldArray({
        control: methods.control,
        name: 'userRankHistoryList'
    });

    // Onboard
    const {
        fields: fieldsOnboardHistory,
        append: appendOnboardHistory,
        remove: removeOnboardHistory
    } = useFieldArray({
        control: methods.control,
        name: 'userOnboardHistoryList'
    });

    // billable
    const {
        fields: fieldsUserBillableHistory,
        append: appenUserdBillableHistory,
        remove: removeUserBillableHistory
    } = useFieldArray({
        control: methods.control,
        name: 'userBillableHistoryList'
    });

    const addUserRankHistoryHandler = () => {
        appendRankHistory(userRankHistoryFormDefault);
    };

    const addUserOnboardHistoryHandler = () => {
        appendOnboardHistory(userOnboardHistoryFormDefault);
    };

    const addUserBillableHistoryHandler = () => {
        appenUserdBillableHistory(userBillableFormDefault);
    };

    const handleRemoveOnboardHistory = (index: number) => {
        removeOnboardHistory(index);
    };

    const handleRemoveRankHistory = (index: number) => {
        removeRankHistory(index);
    };

    // Event
    const handleChangTypeProjectPermission = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTypeProjectPermission(value);
    };

    const handleSubmit = (values: any) => {
        const currentDate = `${dateFormat(new Date())}`;
        const contractor = values.contractor ? 'Yes' : 'No';
        const logtime = values.logtime ? 'Yes' : 'No';
        const onboardDate = dateFormat(values.onboardDate);
        const outboardDate = dateFormat(values.outboardDate);
        !values.memberCode && delete values.memberCode;

        const valueUserOnboard: IUserOnboardHistory[] = values?.userOnboardHistoryList?.map((item: IUserOnboardHistory) => ({
            fromDate: dateFormat(item.fromDate, DATE_FORMAT.DDMMYYYY),
            toDate: dateFormat(item.toDate, DATE_FORMAT.DDMMYYYY),
            contractor: item.contractor === 'true' ? 'Yes' : 'No'
        }));

        const valueRank: IUserRankHistory[] = values?.userRankHistoryList?.map((item: IUserRankHistory) => ({
            fromDate: dateFormat(item.fromDate, DATE_FORMAT.DDMMYYYY),
            toDate: dateFormat(item.toDate, DATE_FORMAT.DDMMYYYY),
            titleCode: item.titleCode,
            rankId: item.rankId
        }));

        const valueBillable: IUserBillableHistory[] = values?.userBillableHistoryList?.map((item: IUserBillableHistory) => ({
            fromDate: dateFormat(item.fromDate, DATE_FORMAT.DDMMYYYY),
            toDate: dateFormat(item.toDate, DATE_FORMAT.DDMMYYYY)
        }));

        const payload = {
            ...values,
            onboardDate,
            outboardDate,
            contractor,
            logtime,
            userOnboardHistoryList: valueUserOnboard,
            userRankHistoryList: valueRank,
            userBillableHistoryList: valueBillable,
            projectPermissionEntity: {
                ...values.projectPermissionEntity,
                assignedProjectList: values.projectPermissionEntity.type === 'All' ? [] : values.projectPermissionEntity.assignedProjectList
            }
        };

        if (isEdit) {
            editUser({
                ...payload,
                idHexString: user.idHexString,
                lastUpdate: currentDate
            });
        } else {
            addUser({
                ...payload,
                createDate: currentDate
            });
        }
    };

    const handleChangeTab = (event: SyntheticEvent, value: number) => {
        setTabValue(value);
    };

    // Search group
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        // create a new array by filtering the original array
        const filteredGroup = groupByFilters.filter((group: IGroup) => {
            // if no input the return the original
            if (value === '') return group;
            // return the item which contains the user input
            else return group.groupName.toLowerCase().includes(value);
        });
        startTransition(() => {
            setGroups(filteredGroup);
        });
    };

    // Search project
    const handleSearchProjects = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        // create a new array by filtering the original array
        const filteredProject = projectByFilters.filter((project: any) => {
            // if no input the return the original
            if (value === '') return project;
            // return the item which contains the user input
            else return project.projectName.toLowerCase().includes(value);
        });

        startTransition(() => {
            setProjects(filteredProject);
        });
    };

    const focusErrors = () => {
        const tabNumber = getTabValueByFieldError(errors, FIELD_BY_TAB_USERS);
        setTabValue(tabNumber);
    };

    // useEffect
    useEffect(() => {
        getAllGroup();
        getAllProject();
    }, []);

    useEffect(() => {
        focusErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    return (
        <Modal isOpen={open} title={isEdit ? 'edit-user' : 'add-user'} onClose={handleClose} keepMounted={false} maxWidth="md">
            <FormProvider onSubmit={handleSubmit} formReturn={{ ...methods }}>
                {/* Tabs  */}
                <TabCustom value={tabValue} tabs={addOrEditUserTabs} handleChange={handleChangeTab} />
                <TabPanel value={tabValue} index={0}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={6}>
                            <Input name="memberCode" label={<FormattedMessage id="member-code" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input required name="userName" label={<FormattedMessage id="user-name" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input required name="firstName" label={<FormattedMessage id="first-name" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input required name="lastName" label={<FormattedMessage id="last-name" />} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Department required />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Status isShowAll={false} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Checkbox name="logtime" label="Logtime" />
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Group */}
                <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={gridSpacing} sx={{ mt: '20px' }}>
                        <Grid item xs={12} lg={12}>
                            <Input
                                name="search"
                                textFieldProps={{
                                    type: 'search',
                                    placeholder: intl.formatMessage({ id: 'search-groups' }),
                                    onChange: handleSearch
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{ display: 'flex' }}>
                            <CheckboxGroup label="select-group" name="groups" options={groups} row config={GROUP_OPTION_CONFIG} />
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* On/outboard info */}
                <TabPanel value={tabValue} index={2}>
                    <Grid container spacing={gridSpacing}>
                        <TableContainer>
                            <Stack
                                direction="row"
                                justifyContent="left"
                                alignItems="left"
                                paddingTop={'10px'}
                                paddingLeft={'10px'}
                                maxWidth="md"
                            >
                                <Tooltip
                                    placement="top"
                                    title={<FormattedMessage id={'add'} />}
                                    onClick={() => addUserOnboardHistoryHandler()}
                                >
                                    <IconButton aria-label="delete" size="small">
                                        <AddCircleOutlineIcon sx={{ fontSize: '1.1rem' }} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Table heads={<FieldsOnboardHistoryTableTHead />} data={fieldsOnboardHistory}>
                                <TableBody>
                                    {fieldsOnboardHistory?.map((item, index) => (
                                        <FieldsOnboardHistoryTableTBody key={item.id} index={index} remove={handleRemoveOnboardHistory} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </TabPanel>

                {/* Title */}
                <TabPanel value={tabValue} index={3}>
                    <Grid container spacing={gridSpacing}>
                        <TableContainer>
                            <Stack
                                direction="row"
                                justifyContent="left"
                                alignItems="left"
                                paddingTop={'10px'}
                                paddingLeft={'10px'}
                                maxWidth="md"
                            >
                                <Tooltip
                                    placement="top"
                                    title={<FormattedMessage id={'add'} />}
                                    onClick={() => addUserRankHistoryHandler()}
                                >
                                    <IconButton aria-label="delete" size="small">
                                        <AddCircleOutlineIcon sx={{ fontSize: '1.1rem' }} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Table heads={<FieldRankHistoryTableTHead />} data={fieldsRankHistory}>
                                {/* <FieldRankHistoryTableTHead /> */}
                                <TableBody>
                                    {fieldsRankHistory?.map((item, index) => (
                                        <FieldsRankHistoryTableTBody
                                            key={item.id}
                                            index={index}
                                            remove={handleRemoveRankHistory}
                                            count={fieldsRankHistory.length}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </TabPanel>

                {/* Billable */}
                <TabPanel value={tabValue} index={4}>
                    <Grid container spacing={gridSpacing}>
                        <TableContainer>
                            <Stack
                                direction="row"
                                justifyContent="left"
                                alignItems="left"
                                paddingTop={'10px'}
                                paddingLeft={'10px'}
                                maxWidth="md"
                            >
                                <Tooltip
                                    placement="top"
                                    title={<FormattedMessage id={'add'} />}
                                    onClick={() => addUserBillableHistoryHandler()}
                                >
                                    <IconButton aria-label="delete" size="small">
                                        <AddCircleOutlineIcon sx={{ fontSize: '1.1rem' }} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Table heads={<UserBillableTableTHead />} data={fieldsUserBillableHistory}>
                                <TableBody>
                                    {fieldsUserBillableHistory?.map((item, index) => (
                                        <UserBillableHistoryTableTBody key={item.id} index={index} remove={removeUserBillableHistory} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </TabPanel>
                {/* Project permission */}
                <TabPanel value={tabValue} index={5}>
                    <Radio
                        name="projectPermissionEntity.type"
                        label="project-permission"
                        options={PROJECT_PERMISSION_OPTIONS}
                        handleChange={handleChangTypeProjectPermission}
                    />
                    {typeProjectPermission === 'Assigned' ? (
                        loadingProject ? (
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} lg={12}>
                                    <Input
                                        name="search"
                                        textFieldProps={{
                                            type: 'search',
                                            placeholder: intl.formatMessage({ id: 'search-project' }),
                                            onChange: handleSearchProjects
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={12} sx={{ display: 'flex' }}>
                                    <CheckboxGroup
                                        label="select-project"
                                        name="projectPermissionEntity.assignedProjectList"
                                        options={sortProjectByPermission(projects)}
                                        row
                                        config={PROJECT_OPTION_CONFIG}
                                    />
                                </Grid>
                            </Grid>
                        ) : (
                            <CircularProgress />
                        )
                    ) : (
                        <></>
                    )}
                </TabPanel>

                <DialogActions>
                    <Button color="error" onClick={handleClose}>
                        <FormattedMessage id="cancel" />
                    </Button>
                    <LoadingButton loading={loading} variant="contained" type="submit">
                        <FormattedMessage id="submit" />
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Modal>
    );
};

export default AddOrEditUser;
