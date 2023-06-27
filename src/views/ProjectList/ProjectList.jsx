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
import { useDispatch } from 'react-redux';
import { setViewToRender } from '../../state/redux/viewsConfig/viewSwitcherSlice';

const ProjectList = () => {
	const dispatch = useDispatch();
	return (
		<Grid
			templateRows='repeat(11, 1fr)'
			templateColumns={'repeat(5, 1fr)'}
			// alignItems='center'
			gap='1'
			// textAlign='center'
		>
			<GridItem rowSpan={2} colSpan={5}>
				<Button
					variant='cool6'
				>Projects</Button>
			</GridItem>
			<GridItem rowSpan={1} colSpan={5}>
				<HStack justify={{ base: 'center', md: 'space-between'}} maxW={{base: '100%', md: '60vw'}}>
					<InputGroup
						bg={useColorModeValue('cool.secondaryLight', 'cool.secondaryDark')}
						w={{ base: '70%', md: "30vw" }}
					>
						<Input type='text' placeholder='Search Project' />
						<InputRightElement pointerEvents='none'>
							<SearchIcon color='gray.300' />
						</InputRightElement>
					</InputGroup>
					<Button
						variant='cool6'
						borderRadius='50px'
						w={{ base: '30%', md: "10vw" }}
						onClick={()=>dispatch(setViewToRender('Location'))}
					>Add new +</Button>
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
