import {useRef} from 'react';
import {Flex, Heading, Spacer, IconButton, useDisclosure, useMediaQuery} from '@chakra-ui/react';
import {HamburgerIcon} from '@chakra-ui/icons';
import {Link as RouterLink} from 'react-router-dom';
import ColorModeSwitcher from "./ColorModeSwitcher";
import SideBar from "./SideBar";

function NavBar({graphType, setGraphType, logout}) {

  const [isLarger] = useMediaQuery('(min-width: 1000px)');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <Flex py={4} px={isLarger ? 10 : 4} align="center">
        <Heading as={RouterLink} to="/">Stats</Heading>
        <Spacer />
        <ColorModeSwitcher />
        <IconButton ml={4} icon={<HamburgerIcon w={6} h={6} />} ref={btnRef} onClick={onOpen} />
      </Flex>
      <SideBar isOpen={isOpen} btnRef={btnRef} onClose={onClose} graphType={graphType} setGraphType={setGraphType} logout={logout} />
    </>
  );
}

export default NavBar;