import { Card, CardBody, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GoogleMapDirection } from '../../../components';
import UtilityProviders from '../UtilityProviders/UtilityProviders';

const Location = () => {
	const [location, setLocation] = useState(null);
	console.log("component", location)
	return (
		<Flex gap="8" direction={{ base: 'column', md: 'row' }}>
			<GoogleMapDirection setLocation={setLocation}/>
			<Card w={{ base: 'full', md: '22vw' }} boxShadow='0 2px 14px -1px rgba(0,0,0,0.25)'>
				<CardBody>
					<UtilityProviders location={location}/>
				</CardBody>
			</Card>
		</Flex>
		
	);
};

export default Location;
