import { createSlice } from '@reduxjs/toolkit';

//This function normalizes the data
function projectInterface(item){
    return {
        id: item.projectId,
        location: item.location,
        projectName: item.projectName,
        utilityProviders: item.utilityProviders,
        designConditions: item.designConditions,
        dwellingInfo: item.dwellingInfo,
        workscope: item.workscope,
        dateCreated: item.dateCreated
    }
}

export const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        list: [],
    },
    reducers: {
        setProjects: (state, action) => {
            state.list = action.payload.map( item => {
                return projectInterface(item)
            })
        },
        addProject: (state, action) => {
            const newItem = projectInterface(action.payload)
            state.list = [ newItem , ...state.list ];
        },
        updateProject: (state, action) => {
            const itemUpdated = projectInterface(action.payload)
            state.list = state.list.map( item => item.id === itemUpdated.id ? itemUpdated : item );
        },
        removeProject: (state, action) => {
            state.list = state.list.filter( item => item.id !== action.payload );
        }
    }
})

export const {
    setProjects,
    addProject,
    updateProject,
    removeProject
} = projectSlice.actions

export default projectSlice.reducer

// //GET request

// export const fetchProjects = () => (dispatch) => {
//     fetch("http://45.79.197.74:8081/Projects/list", {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*', // Reemplaza '*' con el origen correcto de tu aplicación
//     },
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
// }