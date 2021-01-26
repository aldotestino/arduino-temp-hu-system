import { useColorMode, Switch } from '@chakra-ui/react';
import {colorScheme} from "../config";

function ColorModeSwitcher(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch
      size="lg"
      isChecked={colorMode === 'dark'}
      colorScheme={colorScheme}
      onChange={toggleColorMode}
      {...props}
    />
  );
}

export default ColorModeSwitcher;