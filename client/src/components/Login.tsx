import {useState} from 'react';
import {useToast, Checkbox} from '@chakra-ui/react';
import Form from "./Form";
import {colorScheme, serverUrl} from "../config";
import {FieldI, UserI} from '../types';

const fields: Array<FieldI> = [
  {
    id: 'username',
    label: 'Username',
    required: true,
    type: 'text'
  },
  {
    id: 'password',
    label: 'Password',
    required: true,
    type: 'password'
  }
];

interface LoginProps {
  setId: (id: string) => void
}

function Login({setId}: LoginProps) {

  const toast = useToast();
  const [remember, setRemember] = useState(false);

  async function onSubmit(values: UserI) {
    const {id, error}: {id: string | undefined, error: string | undefined} = await  fetch(serverUrl+'/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(r => r.json());
    if(error) {
      toast({
        title: 'Login',
        description: error,
        duration: 5000,
        status: 'error',
        isClosable: true,
        position: 'top-right'
      });
      return;
    }
    if(id) {
      if(remember) {
        localStorage.setItem('id', id);
      }
      setId(id);
    }
  }

  return (
    <Form fields={fields} onSubmit={onSubmit} submitLabel="Login">
      <Checkbox isChecked={remember} onChange={() => setRemember(!remember)}
                alignSelf="flex-start" colorScheme={colorScheme}>
        Ricordami
      </Checkbox>
    </Form>
  );
}

export default Login;