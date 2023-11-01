// project imports
import Modal from 'components/extended/Modal';
import { Table } from 'components/extended/Table';
import { IProjectHeadCount } from 'types';
import ProjectHeadCountThead from './ProjectHeadcountThead';
import ProjectHeadCountTBody from './ProjectHeadcountTBody';

interface IProjectHeadCountProps {
    open: boolean;
    handleClose: () => void;
    headCounts: IProjectHeadCount[];
    isLoading: boolean;
}

const ProjectHeadCount = (props: IProjectHeadCountProps) => {
    const { open, handleClose, headCounts, isLoading } = props;

    return (
        <Modal isOpen={open} title={'project-headcount'} onClose={handleClose} keepMounted={false} maxWidth="sm">
            <Table heads={<ProjectHeadCountThead />} isLoading={isLoading} data={headCounts}>
                <ProjectHeadCountTBody headCounts={headCounts} />
            </Table>
        </Modal>
    );
};

export default ProjectHeadCount;
