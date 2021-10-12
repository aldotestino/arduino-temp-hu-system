import {ChangeEvent, RefObject} from 'react';
import {
  Drawer, 
  DrawerBody, 
  DrawerFooter, 
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Select, 
  Button, 
  Text} from '@chakra-ui/react';
import {GraphType} from '../types';

interface SideBarProps {
  isOpen: boolean,
  onClose: () => void,
  btnRef: RefObject<HTMLButtonElement>,
  graphType: GraphType,
  setGraphType: (graphType: GraphType) => void,
  logout: () => void,
}

function SideBar({isOpen, onClose, btnRef, graphType, setGraphType, logout}: SideBarProps) {

  function handleChangeGraphType(e: ChangeEvent<HTMLSelectElement>) {
    localStorage.setItem('graphType', e.target.value);
    setGraphType(e.target.value as GraphType);
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Opzioni</DrawerHeader>

          <DrawerBody>
            <Text mb={2}>Tipo di grafico</Text>
            <Select value={graphType} onChange={handleChangeGraphType}>
              <option value={GraphType.BAR}>Bar</option>
              <option value={GraphType.LINE}>Line</option>
            </Select>
          </DrawerBody>

          <DrawerFooter>
            <Button onClick={logout}>Logout</Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default SideBar
