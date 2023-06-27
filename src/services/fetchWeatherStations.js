import { getServicesUrl } from "./api/getServicesUrl";
import { setWeatherStations } from "../state/redux/projects/weatherStationSlice";

const fetchWeatherStations = () => (dispatch) => {

    fetch( getServicesUrl('weather-stations'), {
        method: 'POST',
        body: JSON.stringify({
            "latitude":40.7128,
            "longitude": -74.0059
        })
    })
        .then( response => response.json())
        .then( data => dispatch(setWeatherStations(data)))
        .catch( error => console.log(error))
}
export default fetchWeatherStations;