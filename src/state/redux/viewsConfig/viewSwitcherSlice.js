import { createSlice } from '@reduxjs/toolkit';

export const viewSwitcherSlice = createSlice({
    name: 'viewSwitcher',
    initialState: {
        viewToRender: 'ProjectList',
    },
    reducers: {
        setViewToRender: (state, action) => {
            state.viewToRender = action.payload
        }
    }
})

export const {
    setViewToRender
} = viewSwitcherSlice.actions

export default viewSwitcherSlice.reducer