import { Box, Button, FormControl, FormLabel, Input, Select, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchUtilityProviders from '../../../../services/fetchUtilityProviders';
import { getServicesUrl } from '../../../../services/api/getServicesUrl';
import { setUtilityProviders } from '../../../../state/redux/projects/utilityProviderSlice';

const UtilityProviders = () => {
	const [projectName, setProjectName] = useState('')
	const [utilityProviderSelected, setUtilityProviderSelected] = useState({
		electricity: '',
		fossilFuel: ''
	})
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUtilityProviders());
	}, [])

	const { electricity, fossilFuel } = useSelector(state => state.utilityProviders)

	// console.log(electricity);
	// console.log(fossilFuel);

	const handleChange = (event) => {
		setUtilityProviderSelected({
			...utilityProviderSelected,
			[event.target.name]: event.target.value
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(projectName, utilityProviderSelected);
	};

	return (
		<Box maxW="md" mx="auto" mt={8} p={4}>
			<form onSubmit={handleSubmit}>
				<VStack spacing={4} align="start">
				<FormControl>
					<FormLabel>Project Name</FormLabel>
					<Input
						name="projectName"
						type="text"
						placeholder="Enter the project name"
						onChange={ e => setProjectName(e.target.value)}
						value={projectName}
					/>
				</FormControl>

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
					colorScheme='blue'
					variant="solid"
					type="submit"
					alignSelf="flex-end"
				>
					{'Next >'}
				</Button>
				</VStack>
			</form>
		</Box>
	);
};

export default UtilityProviders;
