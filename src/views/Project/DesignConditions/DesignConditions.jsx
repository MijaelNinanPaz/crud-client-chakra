import {
	Box,
	Button,
	Card,
	CardBody,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Select,
	VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewToRender } from '../../../state/redux/viewsConfig/viewSwitcherSlice';

const DesignConditions = () => {
	const [weatherStation, setWeatherStations] = useState("");
	const [heating99DB, setHeating99DB] = useState(null);
	const [cooling01DB, setCooling01DB] = useState(null);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(fetchWeatherStations());
	// }, [])

	const { list } = useSelector(state => state.weatherStations)

	const handleWeatherStationChange = (event) => {
		const station = list.find(item => item.weatherStation === event.target.value);
		setWeatherStations(station.weatherStation);
		setHeating99DB(station.heating99DB);
		setCooling01DB(station.cooling01DB);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		//localStorage
		const newProjectRecovered = JSON.parse(localStorage.getItem('newProject'));
		let newProject;
		if(newProjectRecovered) {
			newProject = {
				...newProjectRecovered,
				designConditions: {
					weatherStation,
					heating99DB,
					cooling01DB
				}
			}
		} else {
			newProject = {
				designConditions: {
					weatherStation,
					heating99DB,
					cooling01DB
				}
			}
		}
		console.log(newProject)
		const newProjectString = JSON.stringify(newProject);
		localStorage.setItem("newProject", newProjectString);
		dispatch(setViewToRender('DwellingInfo'))
	};

	return (
		<Flex justify='center'>
			<Card w={{ base: 'full', md: '30vw' }} boxShadow='0 2px 14px -1px rgba(0,0,0,0.25)'>
				<CardBody>
					<Box maxW="md" mx="auto" mt={8} p={4}>
						<form onSubmit={handleSubmit}>
							<VStack spacing={4} align="start">
								<FormControl>
									<FormLabel>Weather Station</FormLabel>
									<Select
										name="weatherStation"
										placeholder="Select one..."
										onChange={handleWeatherStationChange}
										value={weatherStation}
									>
									{list.map(item => (
										<option value={item.weatherStation}>{item.weatherStation}</option>
									))}
									</Select>
								</FormControl>
								<FormControl>
									<FormLabel>Summer Design Temp</FormLabel>
									<Input
										name="heating99DB"
										type="number"
										onChange={e=>setHeating99DB(Number(e.target.value))}
										value={heating99DB}
									/>
								</FormControl>
								<FormControl>
									<FormLabel>Winter Design Temp</FormLabel>
									<Input
										name="cooling01DB"
										type="number"
										onChange={e=>setCooling01DB(Number(e.target.value))}
										value={cooling01DB}
									/>
								</FormControl>
								<Button
									variant="cool6"
									type="submit"
									alignSelf="flex-end"
								>
									{'Next >'}
								</Button>
							</VStack>
						</form>
					</Box>
				</CardBody>
			</Card>
		</Flex>
		
	);
};

export default DesignConditions;
