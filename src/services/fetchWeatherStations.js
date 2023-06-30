import { getServicesUrl } from "./api/getServicesUrl";
import { setWeatherStations } from "../state/redux/projects/weatherStationSlice";

const fetchWeatherStations = (coordinates) => (dispatch) => {

    fetch( getServicesUrl('weather-stations'), {
        method: 'POST',
        body: JSON.stringify(coordinates)
    })
        .then( response => response.json())
        .then( data => dispatch(setWeatherStations(data)))
        .catch( error => console.log(error))
}
export default fetchWeatherStations;