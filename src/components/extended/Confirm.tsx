import { useAppDispatch, useAppSelector } from 'app/hooks';

// material ui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, Stack, Typography } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import { closeConfirm, confirmSelector } from 'store/slice/confirmSlice';

// third party
import { FormattedMessage } from 'react-intl';

const Confirm = () => {
    const confirm = useAppSelector(confirmSelector);
    const dispatch = useAppDispatch();

    const handleConfirm = () => {
        confirm.handleConfirm();
    };

    return (
        <Dialog
            keepMounted={false}
            open={confirm.open}
            onClose={() => dispatch(closeConfirm())}
            maxWidth="xs"
            sx={{
                '& .MuiDialog-paper': { p: 0 }
            }}
        >
            <MainCard title={confirm.title}>
                <Box sx={{ mb: '20px' }}>
                    <Typography variant="subtitle1">{confirm.content}</Typography>
                </Box>
                <Stack direction="row" spacing={1} justifyContent="center">
                    <Button color="error" onClick={() => dispatch(closeConfirm())}>
                        <FormattedMessage id="cancel" />
                    </Button>
                    <LoadingButton variant="contained" type="submit" onClick={handleConfirm}>
                        <FormattedMessage id="confirm" />
                    </LoadingButton>
                </Stack>
            </MainCard>
        </Dialog>
    );
};
export default Confirm;
