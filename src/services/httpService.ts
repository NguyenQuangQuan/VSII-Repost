/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { transformRequestOptions } from 'utils/common';
import { getCookieByKey } from 'utils/cookies';

// server baseUrl
const baseUrl = `${process.env.REACT_APP_BASE_URL_API}`;

const headers = {
    'Access-Control-Allow-Origin': '*',
    'x-frontend-domain': window.location.host
} as any;

/**
 * api service
 */
const ApiService = {
    /**
     * @param options ApiOptions
     * @param params
     * @returns api response
     */
    request: async (options: any, params?: any) => {
        const axiosBody = { ...options };

        // access token
        const accessToken = getCookieByKey('accessToken');

        options.dontNeedToken ? delete headers['Authorization'] : (headers['Authorization'] = 'Bearer ' + accessToken);

        headers['Content-Type'] = options.upload ? 'multipart/form-data' : 'application/json';

        if (params) {
            switch (options.method) {
                case 'GET':
                case 'DELETE':
                    axiosBody.params = params;
                    break;
                default:
                    axiosBody.data = params;
            }
        }

        // query
        const axiosConfig = axios.create({
            baseURL: baseUrl,
            headers: headers,
            withCredentials: true,
            paramsSerializer: (params) => {
                return transformRequestOptions(params);
            }
        });

        const x = await axiosConfig({ ...axiosBody })
            .then((response) => {
                let data = response.data;
                if (options.responseType === 'arraybuffer' && response.headers['content-disposition']) {
                    const filename = response.headers['content-disposition'].substring(
                        response.headers['content-disposition'].indexOf('=') + 1
                    );
                    data = {
                        context: response.data,
                        filename: filename
                    };
                }
                return { data, error: undefined };
            })
            .catch((error) => {
                return { data: undefined, error: error };
            });

        return x;
    }
};

export default ApiService;
