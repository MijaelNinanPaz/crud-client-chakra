import { createSlice } from '@reduxjs/toolkit';

// //This function normalizes the data
// function utilityProviderInterface(item){
//     return {
//         id: item.utilityProviderId,
//         title: item.title,
//         description: item.description
//     }
// }

export const utilityProviderSlice = createSlice({
    name: 'utilityProviders',
    initialState: {
        electricity: [],
        fossilFuel: [],
        request:{},
        serviceName: '',
        serviceRequestId: 0,
    },
    reducers: {
        setUtilityProviders: (state, action) => {
            const response = action.payload.response
            const responseLength = response.length
            const electricity =  []
            const fossilFuel =  []

            for (let i = 0; i < responseLength; i++) {
                if (response[i].electricity === true) {
                    electricity.push(response[i])
                }
                if (response[i].fossilFuel === true) {
                    fossilFuel.push(response[i])
                }
            }
            state.electricity = electricity
            state.fossilFuel = fossilFuel

            //easy way
            // state.electricity = action.payload.response.filter( item => item.electricity === true );
            // state.fossilFuel = action.payload.response.filter( item => item.fossilFuel === true );
        }
    }
})

export const {
    setUtilityProviders
} = utilityProviderSlice.actions

export default utilityProviderSlice.reducer