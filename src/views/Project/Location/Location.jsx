import { Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { GoogleMapDirection } from '../../../components';
import { useDispatch } from 'react-redux';
import { setViewToRender } from '../../../state/redux/viewsConfig/viewSwitcherSlice';
import fetchUtilityProviders from '../../../services/fetchUtilityProviders';
import fetchWeatherStations from '../../../services/fetchWeatherStations';


const Location = () => {
	const [location, setLocation] = useState(null);
	const [projectName, setProjectName] = useState('')
	const dispatch = useDispatch();

	const onCLickNext = () => {

		if ( location && projectName !== '' ) {

			//localStorage
			const newProjectRecovered = JSON.parse(localStorage.getItem('newProject'));
			let newProject;
			if(newProjectRecovered) {
				newProject = {
					...newProjectRecovered,
					projectName,
				}
			} else {
				newProject = {
					projectName,
				}
			}
			console.log(newProject)
			const newProjectString = JSON.stringify(newProject);
			localStorage.setItem("newProject", newProjectString);

			//fetch to UtilityProviders by location
			dispatch(fetchUtilityProviders({
				country: location.country,
				state: location.state
			}));

			//fetch to WeatherStations
			dispatch(fetchWeatherStations({
				latitude: location.latitude,
				longitude: location.longitude
			}));

			console.log("fetchs by",location)

			//Switch to UtilityProviders
			dispatch(setViewToRender('UtilityProviders'))
		} else {
			alert('Please fill in all fields')
		}
	}
	
	return (
		<GoogleMapDirection setLocation={setLocation}>
			<Input
				name="projectName"
				type="text"
				placeholder="Enter the project name"
				variant='flushed'
				onChange={ e => setProjectName(e.target.value)}
				value={projectName}
			/>
			<Button
				variant="cool6"
				alignSelf="flex-end"
				w={{ base: '30%', md: "10vw" }}
				onClick={onCLickNext}
			>
				{'Next >'}
			</Button>
		</GoogleMapDirection>
	);
};

export default Location;
