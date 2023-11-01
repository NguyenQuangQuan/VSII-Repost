import { Link, Location, Navigate, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import Logo from 'components/Logo';
import AuthFooter from 'components/cards/AuthFooter';
import { AuthCardWrapper, AuthLogin, AuthWrapper } from 'containers/authentication';
import { ESTATUS_LOGIN, PUBLIC_URL } from 'constants/Common';
import { useAppSelector } from 'app/hooks';
import { statusLoginSelector } from 'store/slice/loginSlice';
import { DASHBOARD_PATH } from 'constants/Config';

// ================================|| AUTH - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const location = useLocation();
    const statusLogin = useAppSelector(statusLoginSelector);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const { state }: Location = location;

    if (statusLogin === ESTATUS_LOGIN.SUCCESS) {
        return <Navigate to={state ? `${state.from.pathname}${state.from?.search}` : DASHBOARD_PATH} />;
    }

    return (
        <AuthWrapper>
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                sx={{
                    minHeight: '100vh',
                    background: `linear-gradient(0deg, rgba(47, 102, 184, 0.2), rgba(47, 102, 184, 0.2)), url("${PUBLIC_URL}/background-login.png")`,
                    backgroundSize: 'cover',
                    backgroundPosition: { xs: 'center', sm: 'unset' }
                }}
            >
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#">
                                            <Logo width={200} height={60} />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography gutterBottom variant="h2">
                                                        Login
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthLogin />
                                    </Grid>
                                    {/* <Grid item xs={12} sx={{ mt: 5 }}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                component={Link}
                                                to={'/register'}
                                                variant="subtitle1"
                                                sx={{ textDecoration: 'none' }}
                                            >
                                                Quên mật khẩu?
                                            </Typography>
                                        </Grid>
                                    </Grid> */}
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Login;
