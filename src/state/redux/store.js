import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projects/projectSlice";
import viewSwitcherReducer from "./viewsConfig/viewSwitcherSlice";

export const store = configureStore({
    reducer: {
        projects: projectReducer,
        viewSwitcher: viewSwitcherReducer,
    }
})