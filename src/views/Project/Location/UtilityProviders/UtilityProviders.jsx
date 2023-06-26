import { Box, Button, FormControl, FormLabel, Input, Select, VStack } from '@chakra-ui/react';
import React from 'react';

const UtilityProviders = () => {

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Form submitted');
	};

	return (
		<Box maxW="md" mx="auto" mt={8} p={4}>
			<form onSubmit={handleSubmit}>
				<VStack spacing={4} align="start">
				<FormControl>
					<FormLabel>Project Name</FormLabel>
					<Input type="text" placeholder="Enter the project name" />
				</FormControl>

				<FormControl>
					<FormLabel>Electric Utility Provider</FormLabel>
					<Select placeholder="Select an option">
					<option value="option1">Option 1</option>
					<option value="option2">Option 2</option>
					</Select>
				</FormControl>

				<FormControl>
					<FormLabel>Fossil Fuel Provider</FormLabel>
					<Select placeholder="Select an option">
					<option value="option1">Option 1</option>
					<option value="option2">Option 2</option>
					<option value="option3">Option 3</option>
					</Select>
				</FormControl>

				<Button colorScheme="blue" type="submit" alignSelf="flex-end">
					{'Next >'}
				</Button>
				</VStack>
			</form>
		</Box>
	);
};

export default UtilityProviders;
