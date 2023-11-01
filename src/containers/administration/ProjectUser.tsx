import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

// material-ui
import { Box, Button, Stack, useTheme } from '@mui/material';

// project imports
import { Table } from 'components/extended/Table';
import { gridSpacing } from 'store/constant';
import { IProjectDetail, IProjectHeadCount } from 'types';
import ProjectUserTBody from './ProjectUserTBody';
import ProjectUserThead from './ProjectUserThead';

// assett
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from 'app/hooks';
import { saveOrUpdateProjectUserConfig } from 'pages/administration/Config';
import { openConfirm } from 'store/slice/confirmSlice';
import { deleteProjectUser } from 'store/slice/projectSlice';
import AddOrEditProjectUser from './AddOrEditProjectUser';

interface IProjectUserProps {
    loading: boolean;
    projectUser: IProjectDetail;
    handleClose: () => void;
}

const ProjectUser = (props: IProjectUserProps) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { loading, projectUser, handleClose } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [user, setUser] = useState<any>(saveOrUpdateProjectUserConfig);

    const handleAddOrEditProjectUser = (user?: IProjectHeadCount) => {
        if (user) {
            setIsEdit(true);
            setUser(user);
        } else {
            setIsEdit(false);
            setUser(saveOrUpdateProjectUserConfig);
        }
        setOpen(true);
    };
    const handleOpenDeleteProjectUser = (userDelete: IProjectHeadCount) => {
        dispatch(
            openConfirm({
                open: true,
                title: <FormattedMessage id="warning" />,
                content: (
                    <>
                        <FormattedMessage id="messege-delete" /> {userDelete.userName}
                    </>
                ),
                handleConfirm: () => dispatch(deleteProjectUser({ id: userDelete.idHexString }))
            })
        );
    };

    const handleCloseAddOrEditProjectUser = () => {
        setOpen(false);
    };

    const handleCloseMember = () => {
        setUser(saveOrUpdateProjectUserConfig);
    };

    return (
        <>
            <Box sx={{ marginBottom: theme.spacing(gridSpacing) }}>
                <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={() => handleAddOrEditProjectUser()}>
                    <FormattedMessage id="add-headcount" />
                </Button>
            </Box>
            <Table heads={<ProjectUserThead />} isLoading={loading} data={!!projectUser && projectUser.headcount}>
                <ProjectUserTBody
                    projectUser={projectUser.headcount}
                    handleEdit={handleAddOrEditProjectUser}
                    handleDelete={handleOpenDeleteProjectUser}
                />
            </Table>
            <Box sx={{ marginTop: theme.spacing(gridSpacing) }}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button color="error" onClick={handleClose}>
                        <FormattedMessage id="cancel" />
                    </Button>
                </Stack>
            </Box>
            <AddOrEditProjectUser
                open={open}
                isEdit={isEdit}
                handleClose={handleCloseAddOrEditProjectUser}
                handleCloseMember={handleCloseMember}
                user={user}
                setUser={setUser}
            />
        </>
    );
};

export default ProjectUser;
