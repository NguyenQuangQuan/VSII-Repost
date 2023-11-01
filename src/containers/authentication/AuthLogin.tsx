import React, { useState } from 'react';

//yup
import { yupResolver } from '@hookform/resolvers/yup';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Grid, IconButton, InputAdornment, Stack } from '@mui/material';

// project imports
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FormProvider, Input } from 'components/extended/Form';
import { LOGIN } from 'store/actions/loginActions';
import { loadingLoginSelector } from 'store/slice/loginSlice';
import { loginConfig, loginSchema } from 'pages/Config';
import { encryptByAES } from 'utils/cookies';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ============================|| LOGIN ||============================ //

const AuthLogin = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(loadingLoginSelector);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (value: any) => {
        dispatch({ type: LOGIN, payload: { username: encryptByAES(value.username), password: encryptByAES(value.password) } });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <FormProvider
            form={{
                defaultValues: loginConfig,
                resolver: yupResolver(loginSchema)
            }}
            onSubmit={handleSubmit}
        >
            <Grid item container gap={3}>
                <Grid item xs={12}>
                    <Input
                        name="username"
                        label="LDAP account"
                        textFieldProps={{
                            size: 'small'
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input
                        name="password"
                        label="Password"
                        textFieldProps={{
                            size: 'small',
                            type: showPassword ? 'text' : 'password',
                            InputProps: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                </Grid>
            </Grid>
            <Stack direction="row" justifyContent="center" sx={{ mt: '35px' }}>
                <LoadingButton loading={loading} variant="contained" type="submit" sx={{ width: '200px' }}>
                    Login
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
};

export default AuthLogin;
