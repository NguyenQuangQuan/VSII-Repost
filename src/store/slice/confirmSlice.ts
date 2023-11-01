// redux
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

// project imports

// interface
export interface IConfirmState {
    open: boolean;
    title: string;
    content: string;
    handleConfirm: any;
}

const initialState: IConfirmState = {
    open: false,
    title: '',
    content: '',
    handleConfirm: null
};

const confirmSlice = createSlice({
    name: 'confirm',
    initialState,
    reducers: {
        openConfirm(state, action) {
            const { title, content, handleConfirm } = action.payload;
            state.open = true;
            state.title = title;
            state.content = content;
            state.handleConfirm = handleConfirm;
        },
        closeConfirm(state) {
            state.open = false;
        }
    }
});

export default confirmSlice.reducer;

export const { openConfirm, closeConfirm } = confirmSlice.actions;

export const confirmSelector = (state: RootState) => state.confirm;
