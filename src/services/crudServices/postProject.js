import { addProject } from "../../state/redux/projects/projectSlice";
import { getCrudUrl } from "../api/getCrudUrl";


const postProject = (project, postStatus, setPostStatus) => (dispatch) => {

    //initialize postStatus
    setPostStatus({
        loading: true,
        error: null,
    })

    fetch( getCrudUrl('Projects'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    })
        .then( response => response.json())
        .then( data => dispatch(addProject(data)))
        .catch( error => setPostStatus({...postStatus, error }))
        .finally(() => setPostStatus({...postStatus, loading: false }))
}
export default postProject;