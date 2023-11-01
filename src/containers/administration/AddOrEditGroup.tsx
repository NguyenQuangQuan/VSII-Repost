import { SyntheticEvent } from 'react';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, Grid, Stack } from '@mui/material';

// project imports
import { FormProvider, Input } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { TabPanel } from 'components/extended/Tabs';
import { PERMISSION_EXPANDED_DEFAULT_VALUE, saveOrUpdateGroupTabs, saveOrUpdateGroupAssignedUserTabs } from 'constants/Common';
import TabCustom from 'containers/TabCustom';
import { ISaveOrUpdateGroupConfig, saveOrUpdateGroupConfig, saveOrUpdateGroupSchema } from 'pages/administration/Config';
import { IAssignedUser, IGroupItem } from 'types';
import AssignedUser from './AssignedUser';
import { GroupType } from 'containers/search';
import { TreeView } from 'components/extended/Tree';

// third party
import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage } from 'react-intl';

interface IAddOrEditGroupProps {
    tab: {
        tabValue: number;
        handleChangeTab: (event: SyntheticEvent, newTabValue: number) => void;
    };
    modal: {
        open: boolean;
        handleClose: () => void;
    };
    isEdit: boolean;
    group?: IGroupItem;
    handleSubmit: (values: ISaveOrUpdateGroupConfig) => void;
    renderTree: JSX.Element;
    selectedExpand: string[];
    assignedUser?: IAssignedUser[];
    loading?: boolean;
}

const AddOrEditGroup = (props: IAddOrEditGroupProps) => {
    const { tab, modal, isEdit, handleSubmit, group, renderTree, selectedExpand, assignedUser, loading } = props;

    return (
        <Modal
            isOpen={modal.open}
            title={isEdit ? 'edit-group' : 'add-group'}
            onClose={modal.handleClose}
            keepMounted={false}
            maxWidth="sm"
        >
            <TabCustom
                value={tab.tabValue}
                handleChange={tab.handleChangeTab}
                tabs={isEdit ? saveOrUpdateGroupAssignedUserTabs : saveOrUpdateGroupTabs}
            />
            <FormProvider
                form={{ defaultValues: saveOrUpdateGroupConfig, resolver: yupResolver(saveOrUpdateGroupSchema) }}
                onSubmit={handleSubmit}
                formReset={group && { ...group, groupType: group.groupType ? group.groupType : '' }}
            >
                {/* Form */}
                <TabPanel value={tab.tabValue} index={0}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Input required label={<FormattedMessage id="group-code" />} name="groupId" disabled={isEdit} />
                        </Grid>
                        <Grid item xs={12}>
                            <Input required label={<FormattedMessage id="group-name" />} name="groupName" />
                        </Grid>
                        <Grid item xs={12}>
                            <GroupType />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                textFieldProps={{ placeholder: 'Enter note', multiline: true, rows: 4 }}
                                name="note"
                                label={<FormattedMessage id="note" />}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
                {/* Choose permission */}
                <TabPanel value={tab.tabValue} index={1}>
                    <TreeView defaultExpanded={isEdit ? selectedExpand : PERMISSION_EXPANDED_DEFAULT_VALUE}>{renderTree}</TreeView>
                </TabPanel>
                <TabPanel value={tab.tabValue} index={2}>
                    {isEdit && <AssignedUser assignedUser={assignedUser!} loading={loading} />}
                </TabPanel>
                {/* Cancel | Submit */}
                <Grid item xs={12}>
                    <DialogActions>
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button color="error" onClick={modal.handleClose}>
                                <FormattedMessage id="cancel" />
                            </Button>
                            <LoadingButton variant="contained" type="submit">
                                {isEdit ? <FormattedMessage id="submit" /> : <FormattedMessage id="add" />}
                            </LoadingButton>
                        </Stack>
                    </DialogActions>
                </Grid>
            </FormProvider>
        </Modal>
    );
};

export default AddOrEditGroup;
