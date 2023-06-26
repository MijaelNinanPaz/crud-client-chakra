import React from 'react';
import ProjectTable from './ProjectTable/ProjectTable';
import {
	Button,
	Grid,
	GridItem,
	HStack,
	Input,
	InputGroup,
	InputRightElement,
	useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const ProjectList = () => {
	return (
		<Grid
			templateRows='repeat(11, 1fr)'
			templateColumns={'repeat(5, 1fr)'}
			alignItems='center'
			gap='1'
			// textAlign='center'
		>
			<GridItem rowSpan={2} colSpan={1}>
				<Button
					colorScheme='blue'
					variant='solid'
					borderRadius='50px'
				>Projects</Button>
			</GridItem>
			<GridItem rowSpan={1} colSpan={5}>
				<HStack justify="space-between" width="1280px" >
					<InputGroup
						bg={useColorModeValue('cool.secondaryLight', 'cool.secondaryDark')}
						w="30rem"
					>
						<Input type='text' placeholder='Search Project' />
						<InputRightElement pointerEvents='none'>
							<SearchIcon color='gray.300' />
						</InputRightElement>
					</InputGroup>
					<Button
						colorScheme='blue'
						variant='solid'
						borderRadius='50px'
					>New</Button>
				</HStack>
			</GridItem>
			<GridItem rowSpan={6} colSpan={5}>
				<ProjectTable boxShadow='0 2px 14px -1px rgba(0,0,0,0.25)' />
			</GridItem>
			<GridItem rowSpan={2} colSpan={1}> Pagination</GridItem>
			
		</Grid>
	)
};

export default ProjectList;
