import { Card, CardBody, Flex } from '@chakra-ui/react';
import React from 'react';
import { GoogleMapDirection } from '../../../components';
import { UtilityProviders } from './UtilityProviders';

const Location = () => {
	
	
	return (
		<Flex gap="8" direction={{ base: 'column', md: 'row' }}>
			<Card boxShadow='0 2px 14px -1px rgba(0,0,0,0.25)'>
				<CardBody>
					<GoogleMapDirection/>
				</CardBody>
			</Card>
			<Card w={{ base: 'full', md: '22vw' }} boxShadow='0 2px 14px -1px rgba(0,0,0,0.25)'>
				<CardBody>
					<UtilityProviders/>
				</CardBody>
			</Card>
		</Flex>
		
	);
};

export default Location;
