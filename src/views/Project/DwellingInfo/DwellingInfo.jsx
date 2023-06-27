import { Box, Button, Card, CardBody, Flex, FormControl, FormLabel, HStack, Heading, Image, Input, Select, Stack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const DwellingInfo = () => {
	const [dwellingInfoSelected, setDwellingInfoSelected] = useState({
		constructionType: '',
		nrFloors: null,
		nrRooms: null,
		fossilFuel: ''
	})

	const handleChange = (event) => {
		setDwellingInfoSelected({
			...dwellingInfoSelected,
			[event.target.name]: event.target.value
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(dwellingInfoSelected);
		// dispatch(setViewToRender('DesignConditions'))
	};

	return (
		<Flex justify='center'>
			<Card w={{ base: 'full', md: '30vw' }} boxShadow='0 2px 14px -1px rgba(0,0,0,0.25)'>
				<CardBody>
					<Box maxW="md" mx="auto" mt={8} p={4}>
						<form onSubmit={handleSubmit}>
							<VStack spacing={4} align="start">
								<FormControl>
									<FormLabel>Construction Type</FormLabel>
									<Select
										name="constructionType"
										placeholder="Select one..."
										onChange={handleChange}
										value={dwellingInfoSelected.constructionType}
									>
									<option value="contructionType1">Single Family</option>
									<option value="contructionType2">Townhouse</option>
									<option value="contructionType3">Duplex</option>
									<option value="contructionType4">Apartment</option>
									<option value="contructionType5">Other</option>
									</Select>
								</FormControl>
								<FormControl>
									<FormLabel>N° of floors</FormLabel>
									<Input
										name="nrFloors"
										type="number"
										onChange={handleChange}
										value={dwellingInfoSelected.nrFloors}
									/>
								</FormControl>
								<FormControl>
									<FormLabel>N° of rooms</FormLabel>
									<Input
										name="nrRooms"
										type="number"
										onChange={handleChange}
										value={dwellingInfoSelected.nrRooms}
									/>
								</FormControl>
								<Flex justifyContent="center" flexWrap="wrap" gap={4}>
									<Card
										maxW='sm'
										overflow='hidden'
										cursor='pointer'
										_hover={{
											boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.18)'
										}}
										_active={{
											boxShadow: 'none',
											bg: '#BEE3F8',
											color: 'white'
										}}
									>
										<CardBody align='center'>
											<Image
											src='images/natural-gas.png'
											alt='Natural Gas'
											borderRadius='lg'
											/>
											<Stack mt='6'>
											<Heading size='md'>Natural Gas</Heading>
											</Stack>
										</CardBody>
									</Card>
									<Card
										maxW='sm'
										overflow='hidden'
										cursor='pointer'
										_hover={{
											boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.18)'
										}}
										_active={{
											boxShadow: 'none',
											bg: '#BEE3F8',
											color: 'white'
										}}
									>
										<CardBody align='center'>
											<Image
											src='images/propane.png'
											alt='Propane'
											borderRadius='lg'
											/>
											<Stack mt='6'>
											<Heading size='md'>Propane</Heading>
											</Stack>
										</CardBody>
									</Card>
									<Card
										maxW='sm'
										overflow='hidden'
										cursor='pointer'
										_hover={{
											boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.18)'
										}}
										_active={{
											boxShadow: 'none',
											bg: '#BEE3F8',
											color: 'white'
										}}
									>
										<CardBody align='center'>
											<Image
											src='images/heating-oil.png'
											alt='Heating Oil'
											borderRadius='lg'
											/>
											<Stack mt='6'>
											<Heading size='md'>Heating Oil</Heading>
											</Stack>
										</CardBody>
									</Card>
									<Card
										maxW='sm'
										overflow='hidden'
										cursor='pointer'
										_hover={{
											boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.18)'
										}}
										_active={{
											boxShadow: 'none',
											bg: '#BEE3F8',
											color: 'white'
										}}
									>
										<CardBody align='center'>
											<Image
											src='images/none.png'
											alt='None'
											borderRadius='lg'
											/>
											<Stack mt='6'>
											<Heading size='md'>None</Heading>
											</Stack>
										</CardBody>
									</Card>
								</Flex>
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

export default DwellingInfo;
