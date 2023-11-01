// redux
import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

// project imports
import Api from 'constants/Api';
import { paginationResponseDefault } from 'constants/Common';
import { IProjectEditConfig, IProjectSearchConfig } from 'pages/administration/Config';
import sendRequest from 'services/ApiService';
import {
    IPaginationResponse,
    IProject,
    IProjectDetail,
    IProjectDetailResponse,
    IProjectList,
    IQuotaUpdateHistory,
    IQuotaUpdateHistoryList,
    IResponseList
} from 'types';
import { closeConfirm } from './confirmSlice';
import { openSnackbar } from './snackbarSlice';

// interface
interface IProjectInitialState {
    projects: IProject[];
    pagination: IPaginationResponse;
    projectDetail: IProjectDetail | null;
    loading: boolean;
    detailLoading: boolean;
    editLoading: boolean;
    editLoadingProjectUser: boolean;
    deleteLoadingProjectUser: boolean;
    quotaUpdateHistories: IQuotaUpdateHistory[] | null;
    quotaUpdateHistoryLoading: boolean;
}

// initialState
const initialState: IProjectInitialState = {
    projects: [],
    pagination: paginationResponseDefault,
    projectDetail: null,
    loading: false,
    editLoading: false,
    detailLoading: false,
    editLoadingProjectUser: false,
    deleteLoadingProjectUser: false,
    quotaUpdateHistories: null,
    quotaUpdateHistoryLoading: false
};

// Call API
export const getAllProject = createAsyncThunk(Api.project.getAll.url, async (parameters: IProjectSearchConfig) => {
    const response = await sendRequest(Api.project.getAll, parameters);
    return response;
});

export const getDetailProject = createAsyncThunk(Api.project.getDetail.url, async (parameter: { projectId: number }) => {
    const response = await sendRequest(Api.project.getDetail, parameter);
    return response;
});

export const getQuotaUpdateHistory = createAsyncThunk(Api.project.getQuotaUpdateHistory.url, async (parameter: { projectId: number }) => {
    const response = await sendRequest(Api.project.getQuotaUpdateHistory, parameter);
    return response;
});

export const editProject = createAsyncThunk(Api.project.saveOrUpdate.url, async (project: IProjectEditConfig, { dispatch }) => {
    const response = await sendRequest(Api.project.saveOrUpdate, project);
    if (response.status) {
        dispatch(
            openSnackbar({
                open: true,
                message: 'update-project-success',
                variant: 'alert',
                alert: { color: 'success' }
            })
        );
        return response;
    }
    return response;
});

export const saveOrUpdateProjectUser = createAsyncThunk(Api.project.saveOrUpdateProjectUser.url, async (user: any, { dispatch }) => {
    const { isEdit } = user;
    const response = await sendRequest(Api.project.saveOrUpdateProjectUser, user);
    if (response.status) {
        dispatch(
            openSnackbar({
                open: true,
                message: `${isEdit ? 'project-user-update' : 'project-user-add'}`,
                variant: 'alert',
                alert: { color: 'success' }
            })
        );
        return response;
    }
    return response;
});

export const deleteProjectUser = createAsyncThunk(Api.project.deleteProjectUser.url, async (parameter: { id: string }, { dispatch }) => {
    const response = await sendRequest(Api.project.deleteProjectUser, parameter);
    if (response.status) {
        dispatch(closeConfirm());
        dispatch(
            openSnackbar({
                open: true,
                message: 'delete-success',
                variant: 'alert',
                alert: { color: 'success' }
            })
        );
    }
    return { response, parameter };
});

// Slice & Actions
const projectSlice = createSlice({
    name: 'project',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAll
        builder.addCase(getAllProject.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllProject.fulfilled, (state, action: PayloadAction<IResponseList<IProjectList>>) => {
            if (action.payload?.status) {
                const { result } = action.payload;
                const { pagination, content } = result;
                state.pagination = pagination;
                state.projects = content;
            } else {
                state.projects = [];
            }
            state.loading = false;
        });

        // getDetail
        builder.addCase(getDetailProject.pending, (state) => {
            state.detailLoading = true;
        });
        builder.addCase(getDetailProject.fulfilled, (state, action: PayloadAction<IResponseList<IProjectDetailResponse>>) => {
            const { status, result } = action.payload;
            if (status) {
                const { content } = result;
                state.projectDetail = content;
            } else {
                state.projectDetail = null;
            }
            state.detailLoading = false;
        });

        // getQuota
        builder.addCase(getQuotaUpdateHistory.pending, (state) => {
            state.quotaUpdateHistoryLoading = true;
        });
        builder.addCase(getQuotaUpdateHistory.fulfilled, (state, action: PayloadAction<IResponseList<IQuotaUpdateHistoryList>>) => {
            const { status, result } = action.payload;
            if (status) {
                const { content } = result;
                state.quotaUpdateHistories = content;
            } else {
                state.quotaUpdateHistories = null;
            }
            state.quotaUpdateHistoryLoading = false;
        });

        // edit project
        builder.addCase(editProject.pending, (state) => {
            state.editLoading = true;
        });
        builder.addCase(editProject.fulfilled, (state, action) => {
            const { status, result } = action.payload;
            if (status) {
                let projectArr = current(state.projects);
                const { content } = result;
                const projectsUpdate = projectArr.map((pro) =>
                    pro.projectId === content.project.projectId ? { ...content.project } : pro
                );
                state.projects = projectsUpdate;
                state.editLoading = false;
            } else {
                state.editLoading = false;
            }
        });
        builder.addCase(editProject.rejected, (state) => {
            state.editLoading = false;
        });

        // add or edit project user
        builder.addCase(saveOrUpdateProjectUser.pending, (state) => {
            state.editLoadingProjectUser = true;
        });
        builder.addCase(saveOrUpdateProjectUser.fulfilled, (state, action) => {
            const { status, result } = action.payload;
            if (status) {
                let projectHeadcount = current(state.projectDetail)!.headcount;
                const findIndex = projectHeadcount.findIndex((user) => user.idHexString === result.content.idHexString);
                if (findIndex === -1) {
                    state.projectDetail = {
                        ...current(state.projectDetail),
                        headcount: [...current(state.projectDetail)!.headcount, result.content]
                    } as IProjectDetail;
                    state.editLoadingProjectUser = false;
                } else {
                    const projectHeadcountUpdate = projectHeadcount.map((hc) =>
                        hc.idHexString === result.content.idHexString ? result.content : hc
                    );
                    state.projectDetail = {
                        ...current(state.projectDetail),
                        headcount: projectHeadcountUpdate
                    } as IProjectDetail;
                    state.editLoadingProjectUser = false;
                }
            } else {
                state.editLoadingProjectUser = false;
            }
        });
        builder.addCase(saveOrUpdateProjectUser.rejected, (state) => {
            state.editLoadingProjectUser = false;
        });

        // delete project user
        builder.addCase(deleteProjectUser.pending, (state) => {
            state.deleteLoadingProjectUser = true;
        });
        builder.addCase(deleteProjectUser.fulfilled, (state, action) => {
            const { response, parameter } = action.payload;
            if (response.status) {
                let projectHeadcount = current(state.projectDetail)!.headcount.filter((hc) => hc.idHexString !== parameter.id);
                state.projectDetail = {
                    ...current(state.projectDetail),
                    headcount: projectHeadcount
                } as IProjectDetail;
                state.deleteLoadingProjectUser = false;
            }
        });
    }
});

// Reducer & export
const projectReducer = projectSlice.reducer;
export default projectReducer;

// Selector & export
export const projectListSelector = (state: RootState) => state.project.projects;
export const projectpaginationSelector = (state: RootState) => state.project.pagination;
export const loadingSelector = (state: RootState) => state.project.loading;
export const projectDetailSelector = (state: RootState) => state.project.projectDetail;
export const detailLoadingSelector = (state: RootState) => state.project.detailLoading;
export const editLoadingSelector = (state: RootState) => state.project.editLoading;
export const editLoadingProjectUserSelector = (state: RootState) => state.project.editLoadingProjectUser;
export const deleteLoadingProjectUserSelector = (state: RootState) => state.project.deleteLoadingProjectUser;
export const quotaUpdateHistorySelector = (state: RootState) => state.project.quotaUpdateHistories;
