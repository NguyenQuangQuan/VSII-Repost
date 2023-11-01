// Response API
export interface IMessageResponse {
    code: string;
    message: string;
}

export interface IResultResponse {
    messages: IMessageResponse[];
}

export interface IResponse {
    status: boolean;
    result: IResultResponse;
}

export interface IPaginationResponse {
    pageSize: number;
    pageNumber: number;
    totalElement: number;
    totalPage: number;
}

export interface Response<T> {
    status: boolean;
    result: IResultResponse & T;
}

export interface IResponseList<T> {
    status: boolean;
    result: {
        pagination: IPaginationResponse;
    } & T;
}

// Parameters
export interface IPaginationParam {
    page: number;
    size: number;
}

// Option
export interface IOption {
    value: string | number;
    label: string;
    color?: string;
    number?: number;
    typeCode?: string;
    disabled?: boolean;
    key?: string;
    id?: string;
}

// Tabs
export interface ITabs {
    name: string;
    value?: number;
    permission_key?: string;
}

// TreeItem
export interface ITreeItem {
    value: string;
    name: string;
    children?: ITreeItem[];
}

export interface ITreeItemList {
    content: ITreeItem[];
}

export interface IFieldByTabUser {
    fields: string[];
    tabValue: number;
}
