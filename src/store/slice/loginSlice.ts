// redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

// project imports
import { ESTATUS_LOGIN } from 'constants/Common';
import { IUserInfo } from 'types/authentication';
import { clearAllCookies, setLoginCookies } from 'utils/cookies';

// interface
export interface ILoginState {
    status: ESTATUS_LOGIN;
    loading: boolean;
    userInfo: IUserInfo | null;
}

// initial state
const initialState: ILoginState = {
    status: ESTATUS_LOGIN.NOT_YET,
    loading: false,
    userInfo: null
};

// slice
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login(state, action) {
            state.loading = action.payload;
        },
        loginSuccess(state, action: PayloadAction<any>) {
            const { content } = action.payload;
            state.status = ESTATUS_LOGIN.SUCCESS;
            setLoginCookies({ userInfo: content });
            state.userInfo = content;
            state.loading = false;
        },
        logout(state) {
            clearAllCookies();
            state.userInfo = null;
            state.status = ESTATUS_LOGIN.NOT_YET;
        }
    }
});

export const { login, loginSuccess, logout } = loginSlice.actions;

// reducers
const loginReducer = loginSlice.reducer;
export default loginReducer;

// selectors
export const loadingLoginSelector = (state: RootState) => state.login.loading;
export const statusLoginSelector = (state: RootState) => state.login.status;
export const userInfoSelector = (state: RootState) => state.login.userInfo;
