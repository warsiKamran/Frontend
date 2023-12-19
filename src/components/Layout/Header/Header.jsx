import React from 'react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { RiMenu5Fill, RiLogoutBoxLine, RiDashboardFill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { logout } from '../../../Redux/actions/user';

const LinkButton = ({ url = "/", title = 'Home', onClose}) =>
(
    <Link onClick={onClose} to={url}>
        <Button variant={'ghost'}>{title}</Button>
    </Link>
)

const Header = ({isAuthenticated = false, user}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();

    const logoutHandler = () => {
        onClose();
        dispatch(logout());
    }

    return (
        <>
            <ColorModeSwitcher />

            <Button
                zIndex={"overlay"}
                onClick={onOpen}
                colorScheme={"yellow"}
                width="12" height={'12'}
                rounded="full"
                position={'fixed'}
                top="6"
                left="6"
            >
                <RiMenu5Fill />

                <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay backdropFilter={'blur(2px)'} />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth={'1px'}>COURSES</DrawerHeader>
                        <DrawerBody>
                            <VStack spacing={"5"} alignItems="flex-start">
                                <LinkButton onClose={onClose} url="/" title="Home" />
                                <LinkButton onClose={onClose} url="/courses" title="All Courses" />
                                <LinkButton onClose={onClose} url="/request" title="Request a Course" />
                                <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
                                <LinkButton onClose={onClose} url="/about" title="About" />
                                <HStack
                                    justifyContent={"space-evenly"}
                                    position="absolute"
                                    bottom={"2rem"}
                                    width="80%"
                                >
                                    {isAuthenticated ? (<>
                                        <VStack>
                                            <HStack>
                                                <Link onClick={onClose} to="/profile">
                                                    <Button variant={"ghost"} colorScheme={'yellow'}>Profile</Button>
                                                </Link>
                                                <Button variant={"ghost"} onClick={logoutHandler}>
                                                    <RiLogoutBoxLine />
                                                    Logout
                                                </Button>
                                                {
                                                    user && user.role === "admin" && (<Link onClick={onClose} to="/admin/dashboard">
                                                        <Button colorScheme={"purple"} variant="ghost">
                                                            <RiDashboardFill style={{margin:"4px"}}/>
                                                            Dashboard
                                                        </Button>
                                                    </Link>
                                                )}
                                            </HStack>
                                        </VStack>
                                    </>)
                                        :
                                        (<>
                                            <Link onClick={onClose} to="/login">
                                                <Button colorScheme={'yellow'}>Login</Button>
                                            </Link>
                                            <p>OR</p>
                                            <Link onClick={onClose} to="/register">
                                                <Button colorScheme={'yellow'}>Sign Up</Button>
                                            </Link>
                                        </>)}
                                </HStack>
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Button>
        </>
    );
}


export default Header;