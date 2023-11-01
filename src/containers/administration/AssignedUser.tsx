// project imports
import { Table } from 'components/extended/Table';
import AssignedUserThead from './AssignedUserThead';
import AssignedUserTBody from './AssignedUserTBody';
import { IAssignedUser } from 'types';

interface IAssignedUserProps {
    loading?: boolean;
    assignedUser: IAssignedUser[];
}

const AssignedUser = (props: IAssignedUserProps) => {
    const { assignedUser, loading } = props;

    return (
        <>
            <Table heads={<AssignedUserThead />} isLoading={loading} data={assignedUser}>
                <AssignedUserTBody assignedUser={assignedUser} />
            </Table>
        </>
    );
};

export default AssignedUser;
