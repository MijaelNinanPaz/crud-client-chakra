import { createSlice } from '@reduxjs/toolkit';


export const newProjectSlice = createSlice({
    name: 'newProject',
    initialState: {
        projectName: "Nice house in MA",
        location: {
            "city": "Boston",
            "state": "MA",
            "country": "US",
            "asEntered": "Boston, MA, US",
            "address": "Boston, MA, US",
            "latitude": 42.3600825,
            "longitude": -71.0588801,
            "elevation": 0
        },
        utilityProviders: {
            "electricUtilityId": 1,
            "fossilFuelUtilityId": 2
        },
        designConditions: {
            "weatherStation": "Lawrence Municipal AP",
            "heating99DB": 9,
            "cooling01DB": 88
        },
        dwellingInfo: {
            "constructionType": "Single Family",
            "nrFloors": 2,
            "nrRooms": 3,
            "fossilFuel": "Natural Gas"
        }
    },
    reducers: {
        setNewProjectName: (state, action) => {
            state.projectName = action.payload;
        },
        setNewProjectLocation: (state, action) => {
            state.location = action.payload;
        },
        setNewProjectUtilityProviders: (state, action) => {
            state.utilityProviders = action.payload;
        },
        setNewProjectDesignConditions: (state, action) => {
            state.designConditions = action.payload;
        },
        setNewProjectDwellingInfo: (state, action) => {
            state.dwellingInfo = action.payload;
        }
    }
})

export const {
    setNewProjectProjectName,
    setNewProjectLocation,
    setNewProjectUtilityProviders,
    setNewProjectDesignConditions,
    setNewProjectDwellingInfo
} = newProjectSlice.actions

export default newProjectSlice.reducer