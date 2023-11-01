// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box } from '@mui/material';

import { useAppDispatch } from 'app/hooks';
import { openSync } from 'store/slice/syncSlice';

// assets
import SyncIcon from '@mui/icons-material/Sync';

// ==============================|| MANUAL SYNC ||============================== //

const ManualSyncSection = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const handleOpen = () => {
        dispatch(openSync());
    };

    return (
        <>
            <Box
            // sx={{
            //     mr: 2,
            //     [theme.breakpoints.down('md')]: {
            //         mr: 2
            //     }
            // }}
            >
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                        color: theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.secondary.dark,
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            background: theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.secondary.dark,
                            color: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.secondary.light
                        }
                    }}
                    onClick={handleOpen}
                    color="inherit"
                >
                    <SyncIcon />
                </Avatar>
            </Box>
        </>
    );
};

export default ManualSyncSection;
