import {Flex, Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react';
import Login from '../components/Login';
import Register from '../components/Register';
import {Redirect} from 'react-router-dom';

interface HomeProps {
  id: string | null,
  setId: (id: string) => void
}

function Home({id, setId}: HomeProps) {
  return (
    <Flex my={4} justify='center'>
      {id && <Redirect to='/stats' />}
      <Tabs isFitted variant='enclosed' isLazy>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Registrati</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login setId={setId} />
          </TabPanel>
          <TabPanel>
            <Register setId={setId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Home;