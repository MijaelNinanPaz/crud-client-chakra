// export default function newProjectLocalStorage(key, property) {
//     // recover from localStorage
//     const newProjectRecovered = JSON.parse(localStorage.getItem('newProject'));
//     let newProject;
//     if(newProjectRecovered) {
//         newProject = {
//             ...newProjectRecovered,
//             [key]: property,
//         }
//         return
//     }
//     newProject = {
//         [key]: property,
//     }
//     console.log(newProject)
//     const newProjectString = JSON.stringify(newProject);
//     localStorage.setItem("newProject", newProjectString);
// }