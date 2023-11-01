// redux
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { RootState } from 'app/store';
import { IConditionComment } from 'types/comment';

// interface
export interface IConfirmState {
    open: boolean;
    conditions: IConditionComment | null;
    isCommented: boolean;
    titleDetail: string;
}

const initialState: IConfirmState = {
    open: false,
    conditions: null,
    isCommented: false,
    titleDetail: ''
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        openCommentDialog(state, action) {
            const { titleDetail, conditions } = action.payload;
            state.conditions = conditions;
            state.titleDetail = titleDetail;
            state.open = true;
        },

        closeCommentDialog(state) {
            state.open = false;
        },
        changeCommented(state, action) {
            state.isCommented = action.payload;
        }
    }
});

export default commentSlice.reducer;

export const { openCommentDialog, closeCommentDialog, changeCommented } = commentSlice.actions;

export const openSelector = (state: RootState) => state.comment.open;
export const isCommentedSelector = (state: RootState) => state.comment.isCommented;
export const conditionsSelector = (state: RootState) => state.comment.conditions;
export const titleDetailSelector = (state: RootState) => state.comment.titleDetail;
