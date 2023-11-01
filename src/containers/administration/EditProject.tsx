import { SyntheticEvent } from 'react';

// project imports
import Modal from 'components/extended/Modal';
import { TabPanel } from 'components/extended/Tabs';
import { IProjectDetail, IQuotaUpdateHistory } from 'types';
import EditProjectForm from './EditProjectForm';
import EditProjectTabs from './EditProjectTabs';
import ProjectUser from './ProjectUser';
import QuotaUpdateHistory from './QuotaUpdateHistory';

interface IEditProjectProps {
    open: boolean;
    handleClose: () => void;
    loading: boolean;
    projectDetail: IProjectDetail;
    quotaUpdateHistories?: IQuotaUpdateHistory[];
    tabValue: number;
    handleChangeTab: (event: SyntheticEvent, newTabValue: number) => void;
}

const EditProject = (props: IEditProjectProps) => {
    // Hooks, State, Variable, Props
    const { open, handleClose, loading, projectDetail, tabValue, handleChangeTab, quotaUpdateHistories } = props;
    return (
        <Modal isOpen={open && !loading} title="edit-project" keepMounted={false} onClose={handleClose} maxWidth="md">
            {/* Tabs */}
            <EditProjectTabs tabValue={tabValue} handleChangeTab={handleChangeTab} />
            {/* Form edit project */}
            <TabPanel value={tabValue} index={0}>
                <EditProjectForm projectDetail={projectDetail.project} handleClose={handleClose} />
            </TabPanel>
            {/* List user in project */}
            <TabPanel value={tabValue} index={1}>
                <ProjectUser loading={loading} projectUser={projectDetail!} handleClose={handleClose} />
            </TabPanel>
            {/* update quota history */}
            <TabPanel value={tabValue} index={2}>
                <QuotaUpdateHistory loading={loading} quotaUpdateHistories={quotaUpdateHistories!} handleClose={handleClose} />
            </TabPanel>
        </Modal>
    );
};

export default EditProject;
