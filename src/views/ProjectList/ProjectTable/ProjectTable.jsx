import React from 'react';
import {
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
	useColorModeValue
} from '@chakra-ui/react';
import { useFetchProjects } from '../../../services/hooks';
import { useSelector } from 'react-redux';


const ProjectTable = ({...rest}) => {
	const { 
		loading,
		error,
		handleCancelRequest
	} = useFetchProjects()

	const projects = useSelector( state => state.projects.list );
	const groupedProjects = projects.slice(0, 5)

	return (
		<TableContainer
			display='flex'
			width='1280px'
			p='12px'
			justifyContent='center'
			alignItems='center'
			borderRadius='12px'
			bg={useColorModeValue('cool.secondaryLight', 'cool.secondaryDark')}
			{...rest}
		>
			<Table variant='striped' colorScheme='teal'>
				<TableCaption>Imperial to metric conversion factors</TableCaption>
				<Thead>
				<Tr>
					<Th>PROJECT NAME</Th>
					<Th>LOCATION</Th>
					<Th>CREATION DATE</Th>
				</Tr>
				</Thead>
				<Tbody>
				{groupedProjects.length > 0 && groupedProjects.map(project => (
					<Tr key={project.id}>
						<Td>{project.projectName}</Td>
						<Td>`${project.location.address} ${project.location.city} ${project.location.state}`</Td>
						<Td>{project.dateCreated}</Td>
					</Tr>
				))}
				</Tbody>
				<Tfoot>
				<Tr>
					<Th>To convert</Th>
					<Th>into</Th>
					<Th isNumeric>multiply by</Th>
				</Tr>
				</Tfoot>
			</Table>
		</TableContainer>
	);
};

export default ProjectTable;
