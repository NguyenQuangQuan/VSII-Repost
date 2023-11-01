// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| AUTH FOOTER ||============================== //

const AuthFooter = () => {
    const year = new Date().getFullYear();

    return (
        <Stack direction="row" justifyContent="center">
            <Typography
                variant="subtitle2"
                component={Link}
                href="https://vsi-international.com/"
                target="_blank"
                underline="hover"
                sx={{ cursor: 'pointer', color: 'black' }}
            >
                © {year} - Powered by VSII
            </Typography>
        </Stack>
    );
};

export default AuthFooter;
