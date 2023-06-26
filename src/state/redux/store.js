import { configureStore } from "@reduxjs/toolkit";
import viewSwitcherReducer from "./viewsConfig/viewSwitcherSlice";
import projectReducer from "./projects/projectSlice";
import newProjectReducer from "./projects/newProjectSlice";
import utilityProviderReducer from "./projects/utilityProviderSlice";


export const store = configureStore({
    reducer: {
        viewSwitcher: viewSwitcherReducer,
        projects: projectReducer,
        newProject: newProjectReducer,
        utilityProviders: utilityProviderReducer,
    }
})