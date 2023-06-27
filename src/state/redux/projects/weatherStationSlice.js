import { createSlice } from '@reduxjs/toolkit';

export const weatherStationSlice = createSlice({
    name: 'weatherStations',
    initialState: {
        list: [],
    },
    reducers: {
        setWeatherStations: (state, action) => {
            state.list = action.payload.response
        }
    }
})

export const {
    setWeatherStations
} = weatherStationSlice.actions

export default weatherStationSlice.reducer