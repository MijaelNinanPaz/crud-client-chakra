import { Box, Button, Card, CardBody, CardHeader, Flex, FormControl, FormLabel, Input, Select, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GoogleMapDirection } from '../../../components';

const Location = () => {
	const [geoJson, setGeoJson] = useState({})


	const handleSubmit = (event) => {
		event.preventDefault();
		// Lógica para manejar el envío del formulario
	};
	
	return (
		<Flex gap="8" direction={{ base: 'column', md: 'row' }}>
			<Card boxShadow='0 2px 14px -1px rgba(0,0,0,0.25)'>
				<CardBody>
					<GoogleMapDirection setGeoJson={setGeoJson}/>
				</CardBody>
			</Card>
			<Card w={{ base: 'full', md: '22vw' }} boxShadow='0 2px 14px -1px rgba(0,0,0,0.25)'>
				<CardBody>
					<Box maxW="md" mx="auto" mt={8} p={4}>
						<form onSubmit={handleSubmit}>
							<VStack spacing={4} align="start">
							<FormControl>
								<FormLabel>Project Name</FormLabel>
								<Input type="text" placeholder="Ingrese su nombre" />
							</FormControl>

							<FormControl>
								<FormLabel>Electric Utility Provider</FormLabel>
								<Select placeholder="Seleccione una opción">
								<option value="option1">Option 1</option>
								<option value="option2">Option 2</option>
								</Select>
							</FormControl>

							<FormControl>
								<FormLabel>Fossil Fuel Provider</FormLabel>
								<Select placeholder="Seleccione una opción">
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
				</CardBody>
			</Card>
		</Flex>
		
	);
};

export default Location;
