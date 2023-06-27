import { Card, CardBody, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GoogleMapDirection } from '../../../components';
import { UtilityProviders } from './UtilityProviders';

const Location = () => {
	const [location, setLocation] = useState({
		"city": "Boston 3",
		"state": "MA",
		"address": "Boston, MA, US",
		"country": "US",
		"latitude": 42.3600825,
		"asEntered": "Boston, MA, US",
		"elevation": 0,
		"longitude": -71.0588801
	});
	
	
	return (
		<Flex gap="8" direction={{ base: 'column', md: 'row' }}>
			<Card boxShadow='0 2px 14px -1px rgba(0,0,0,0.25)'>
				<CardBody>
					<GoogleMapDirection setCoordenates={setLocation}/>
				</CardBody>
			</Card>
			<Card w={{ base: 'full', md: '22vw' }} boxShadow='0 2px 14px -1px rgba(0,0,0,0.25)'>
				<CardBody>
					<UtilityProviders location={location}/>
				</CardBody>
			</Card>
		</Flex>
		
	);
};

export default Location;
