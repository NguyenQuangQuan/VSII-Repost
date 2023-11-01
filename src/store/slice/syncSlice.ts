// redux
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

// interface
export interface ISyncState {
    open: boolean;
}

const initialState: ISyncState = {
    open: false
};

const syncSlice = createSlice({
    name: 'sync',
    initialState,
    reducers: {
        openSync(state) {
            state.open = true;
        },
        closeSync(state) {
            state.open = false;
        }
    }
});

export default syncSlice.reducer;

export const { openSync, closeSync } = syncSlice.actions;

export const syncSelector = (state: RootState) => state.sync;
