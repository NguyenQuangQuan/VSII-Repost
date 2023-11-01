import axiosClient from './axiosClient';

export interface IContent {
    message: string;
    status: boolean;
}

export interface IResult {
    message?: string | undefined;
    content: IContent;
    pagination: string;
}

export interface IResponseManualSync {
    result: IResult;
    status: number;
}

const manualSyncAPI = {
    getSyncMonth(year: string | number, month: string | number): Promise<IResponseManualSync> {
        const url = `/manual/month/${year}/${month}`;
        return axiosClient.get(url);
    },
    getSyncWeek(year: string | number, week: string | number): Promise<IResponseManualSync> {
        const url = `/manual/week/${year}/${week}`;
        return axiosClient.get(url);
    }
};

export default manualSyncAPI;
