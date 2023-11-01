import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IDepartment, IProject } from 'types';

// Interface
interface IMasterState {
    department: IDepartment[];
    project: IProject[];
}

// InitialState
const initialState: IMasterState = {
    department: [],
    project: []
};

// Call API

// Slice
const masterSlice = createSlice({
    name: 'master',
    initialState: initialState,
    reducers: {}
});

// Export slice

// Reducer & export
const masterReducer = masterSlice.reducer;
export default masterReducer;

// Selector & export
export const departmentSelector = (state: RootState) => state.master.department;
