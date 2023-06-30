import { getServicesUrl } from "./api/getServicesUrl";
import { setUtilityProviders } from "../state/redux/projects/utilityProviderSlice";

const fetchUtilityProviders = (location) => (dispatch) => {

    fetch( getServicesUrl('utility-providers'), {
        method: 'POST',
        body: JSON.stringify(location)
    })
        .then( response => response.json())
        .then( data => dispatch(setUtilityProviders(data)))
        .catch( error => console.log(error))
}
export default fetchUtilityProviders;