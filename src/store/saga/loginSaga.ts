// redux saga
import { call, put, takeLatest } from 'redux-saga/effects';

// project imports
import Api from 'constants/Api';
import sendRequest from 'services/ApiService';
import { LOGIN as doLoginRequest } from '../actions/loginActions';
import { Response } from 'types';
import { ILoginResponse } from 'types/authentication';
import { login, loginSuccess } from 'store/slice/loginSlice';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { setCookieByKeyObject } from 'utils/cookies';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* loginRequest(action: any): any {
    yield put({ type: login.type, payload: true });
    const data = yield call(sendRequest, Api.auth.login, action.payload);
    if (data) {
        const response: Response<ILoginResponse> = data;
        const { status, result } = response;
        if (status) {
            const { content } = result;
            if (!content.authen) {
                yield put(
                    openSnackbar({
                        open: true,
                        message: 'error-login',
                        variant: 'alert',
                        alert: { color: 'error' }
                    })
                );
                yield put({ type: login.type, payload: false });
                return;
            }
            setCookieByKeyObject(content.token);
            const response = yield call(sendRequest, Api.auth.getUserInfo);
            if (response.status) {
                yield put({ type: loginSuccess.type, payload: response.result });
            }
        }
    } else {
        yield put({ type: login.type, payload: false });
        return;
    }
    yield put({ type: login.type, payload: false });
}
export default function* loginSaga() {
    yield takeLatest(doLoginRequest, loginRequest);
}
