// types
import { MenuProps } from 'types';
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState: MenuProps = {
    selectedItem: ['dashboard'],
    selectedID: null,
    drawerOpen: false
};

// ==============================|| SLICE - MENU ||============================== //

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.selectedItem = action.payload;
        },

        activeID(state, action) {
            state.selectedID = action.payload;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload;
        }
    }
});

export default menuSlice.reducer;

export const { activeItem, openDrawer, activeID } = menuSlice.actions;
