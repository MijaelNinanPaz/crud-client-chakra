import { Box, Button, Card, CardBody, Flex, FormControl, FormLabel, Select, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewToRender } from '../../../state/redux/viewsConfig/viewSwitcherSlice';


const UtilityProviders = () => {
	const [utilityProviderSelected, setUtilityProviderSelected] = useState({
		electricity: '',
		fossilFuel: ''
	})
	const dispatch = useDispatch();

	const { electricity, fossilFuel } = useSelector(state => state.utilityProviders)

	const handleChange = (event) => {
		setUtilityProviderSelected({
			...utilityProviderSelected,
			[event.target.name]: event.target.value
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		//localStorage
		const newProjectRecovered = JSON.parse(localStorage.getItem('newProject'));
		let newProject;
		if(newProjectRecovered) {
			newProject = {
				...newProjectRecovered,
				utilityProviders: utilityProviderSelected
			}
		} else {
			newProject = {
				utilityProviders: utilityProviderSelected
			}
		}
		console.log(newProject)
		const newProjectString = JSON.stringify(newProject);
		localStorage.setItem("newProject", newProjectString);

		dispatch(setViewToRender('DesignConditions'))
	};

	return (
		<Flex justify='center'>
			<Card w={{ base: 'full', md: '30vw' }} boxShadow='0 2px 14px -1px rgba(0,0,0,0.25)'>
				<CardBody>
					<Box maxW="md" mx="auto" mt={8} p={4}>
						<form onSubmit={handleSubmit}>
							<VStack spacing={4} align="start">
							{/* <Text >Project Name</Text>
							<Stack spacing={1}>
								<Text lineHeight={1} >(6xl) In love with React & Next</Text>
								<Text lineHeight={1}>(6xl) In love with React & Next</Text>
								<Text lineHeight={1}>(6xl) In love with React & Next</Text>
								<Text lineHeight={1}>(6xl) In love with React & Next</Text>
							</Stack> */}
							<FormControl>
								<FormLabel>Electric Utility Provider</FormLabel>
								<Select
									name="electricity"
									placeholder="Select an option"
									onChange={handleChange}
									value={utilityProviderSelected.electricity}
								>
								{electricity.map(item => (
									<option key={item.utilityProviderId} value={item.utilityProviderId}>{item.title}</option>
								))}
								</Select>
							</FormControl>

							<FormControl>
								<FormLabel>Fossil Fuel Provider</FormLabel>
								<Select
									name="fossilFuel"
									placeholder="Select an option"
									onChange={handleChange}
									value={utilityProviderSelected.fossilFuel}
								>
								{fossilFuel.map(item => (
									<option key={item.utilityProviderId} value={item.utilityProviderId}>{item.title}</option>
								))}
								</Select>
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

export default UtilityProviders;
