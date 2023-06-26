import React from 'react';
import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	useColorMode,
	Image,
} from '@chakra-ui/react';
import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
	FiMenu,
	FiBell,
	FiChevronDown,
	FiMoon,
	FiSun,
} from 'react-icons/fi';
import { setViewToRender } from '../../state/redux/viewsConfig/viewSwitcherSlice';
import { useDispatch } from 'react-redux';


const LinkItems = [
	{ name: 'Project List', icon: FiHome, view: 'ProjectList'},
	{ name: 'Project', icon: FiTrendingUp, view: 'ProjectList'},
	{ name: 'Location', icon: FiCompass, view: 'Location'},
	{ name: 'Design Conditions', icon: FiStar, view: 'DesignConditions'},
	{ name: 'Dwelling Info', icon: FiSettings, view: 'DwellingInfo'},
];

export default function Body({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box minH="100vh" bg={useColorModeValue('cool.neutralLight', 'cool.neutralDark')}>
		<SidebarContent
			onClose={() => onClose}
			display={{ base: 'none', md: 'block' }}
		/>
		<Drawer
			autoFocus={false}
			isOpen={isOpen}
			placement="left"
			onClose={onClose}
			returnFocusOnClose={false}
			onOverlayClick={onClose}
			// size="full"
		>
			<DrawerContent>
				<SidebarContent onClose={onClose} />
			</DrawerContent>
		</Drawer>
		{/* mobilenav */}
		<MobileNav onOpen={onOpen} />
		<Box ml={{ base: 0, md: 60 }} p="4" pr="8">
			{children}
		</Box>
		</Box>
	);
}



const SidebarContent = ({ onClose, ...rest }) => {
	const dispatch = useDispatch();

	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue('cool.secondaryLight', 'cool.secondaryDark')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			{...rest}>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text fontSize="2xl" fontWeight="bold">
					<Image
						// boxSize='50px'
						objectFit='cover'
						src='/images/image-15.png'
						alt='Cool Calc'
					/>
				</Text>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link) => (
				<NavItem key={link.name} icon={link.icon} view={link.view} dispatch={dispatch}>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
};

const NavItem = ({ icon, children, view, dispatch, ...rest }) => {
	return (
		<Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
		<Flex
			align="center"
			p="4"
			mx="4"
			borderRadius="lg"
			role="group"
			cursor="pointer"
			_hover={{
			bg: 'cyan.400',
			color: 'white',
			}}
			onClick={()=>dispatch(setViewToRender(view))}
			{...rest}>
			{icon && (
			<Icon
				mr="4"
				fontSize="16"
				_groupHover={{
				color: 'white',
				}}
				as={icon}
			/>
			)}
			{children}
		</Flex>
		</Link>
	);
};


const MobileNav = ({ onOpen, ...rest }) => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Flex
		ml={{ base: 0, md: 60 }}
		px={{ base: 4, md: 4 }}
		height="20"
		alignItems="center"
		bg={useColorModeValue('cool.secondaryLight', 'cool.secondaryDark')}
		borderBottomWidth="1px"
		borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
		justifyContent={{ base: 'space-between', md: 'flex-end' }}
		boxShadow='0 2px 4px -1px rgba(0,0,0,0.25)'
		{...rest}>
		<IconButton
			display={{ base: 'flex', md: 'none' }}
			onClick={onOpen}
			variant="outline"
			aria-label="open menu"
			icon={<FiMenu />}
		/>

		<Text
			display={{ base: 'flex', md: 'none' }}
			fontSize="2xl"
			fontWeight="bold">
			<Image
				// boxSize='50px'
				objectFit='cover'
				src='/images/image-15.png'
				alt='Cool Calc'
			/>
		</Text>

		<HStack spacing={{ base: '0', md: '6' }}>
			<IconButton
				size="lg"
				variant="ghost"
				aria-label="open menu"
				icon={<FiBell />}
			/>
			<Flex alignItems={'center'}>
			<Menu>
				<MenuButton
					py={2}
					transition="all 0.3s"
					_focus={{ boxShadow: 'none' }}
				>
					<HStack>
						<Avatar
						size={'sm'}
						src={
							'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
						}
						/>
						<VStack
						display={{ base: 'none', md: 'flex' }}
						alignItems="flex-start"
						spacing="1px"
						ml="2">
						<Text fontSize="sm">My Account Name</Text>
						<Text fontSize="xs" color="gray.600">
							Contractor
						</Text>
						</VStack>
						<Box display={{ base: 'none', md: 'flex' }}>
						<FiChevronDown />
						</Box>
					</HStack>
				</MenuButton>
				<MenuList
					bg={useColorModeValue('cool.secondaryLight', 'cool.secondaryDark')}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
				>
					<MenuItem>Profile</MenuItem>
					<MenuItem>Settings</MenuItem>
					<MenuItem>Billing</MenuItem>
					<MenuDivider />
					<MenuItem
						onClick={toggleColorMode}
					>
						{colorMode === 'light' ? <FiMoon/> : <FiSun/>}
					</MenuItem>
					<MenuDivider />
					<MenuItem>Sign out</MenuItem>
				</MenuList>
			</Menu>
			</Flex>
		</HStack>
		</Flex>
	);
};
