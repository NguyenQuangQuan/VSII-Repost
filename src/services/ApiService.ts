/* eslint-disable prettier/prettier */
// axios
import axios from 'axios';

// project imports
import { store } from 'app/store';
import Api from 'constants/Api';
import HTTP_CODE from 'constants/HttpCode';
import { logout } from 'store/slice/loginSlice';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { IResponse } from 'types/common';
import { isEmpty } from 'utils/common';
import { getCookieByKey, setCookieByKeyObject } from 'utils/cookies';
import HttpService from './httpService';

const handleError = (error: any) => {
    store.dispatch(
        openSnackbar({
            open: true,
            message: error.content,
            variant: 'alert',
            close: true,
            alert: { color: 'error' }
        })
    );
};

const sendRequest = async (api: any, params?: any) => {
    const { data, error } = await HttpService.request(api, params);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status) {
                if (error.response?.status === 401) {
                    const tokenId = getCookieByKey('tokenId');
                    const refreshToken = await HttpService.request(Api.auth.refreshToken, { tokenId });
                    if (isEmpty(refreshToken.data)) {
                        store.dispatch(logout());
                        return;
                    }
                    setCookieByKeyObject(refreshToken.data);
                    // eslint-disable-next-line no-restricted-globals
                    location.reload();
                    return;
                }
                const responseError = error.response?.data as IResponse;
                const errorMsg = {
                    show: true,
                    title: 'A communication error has occurred.',
                    content: responseError.result?.messages[0]
                        ? responseError.result.messages[0].message
                        : HTTP_CODE.hasOwnProperty(error.response.status)
                            ? HTTP_CODE[error.response.status]
                            : error.message
                };
                handleError(errorMsg);
            } else {
                const errorMsg = {
                    show: true,
                    title: 'A system error has occurred!',
                    content: error.message
                };
                handleError(errorMsg);
            }
        } else {
            const errorMsg = {
                show: true,
                title: 'A system error has occurred!',
                content: error.message
            };
            handleError(errorMsg);
        }
    }
    return data;
};

export default sendRequest;
