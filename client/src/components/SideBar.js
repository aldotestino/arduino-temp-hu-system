import {Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Select, Button, Text} from '@chakra-ui/react';

function SideBar({isOpen, onClose, btnRef, graphType, setGraphType, logout}) {

  function handleChangeGraphType(e) {
    localStorage.setItem('graphType', e.target.value);
    setGraphType(e.target.value);
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
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
              <option value="bar">Bar</option>
              <option value="line">Line</option>
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
