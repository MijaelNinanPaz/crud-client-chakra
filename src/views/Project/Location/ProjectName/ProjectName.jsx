import { Box, Card, FormControl, FormLabel, Input, Select, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const ProjectName = () => {
	const [projectName, setProjectName] = useState('')


	const handleSubmit = (event) => {
		event.preventDefault();
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

		dispatch(setViewToRender('DesignConditions'))
	};

	return (
		<Box maxW="md" mx="auto" mt={8} p={4}>
			<Card>

			</Card>
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
					variant="cool6"
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

export default ProjectName;
