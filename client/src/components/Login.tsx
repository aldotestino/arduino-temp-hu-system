import {useState} from 'react';
import {useToast, Checkbox} from '@chakra-ui/react';
import {AtSignIcon, LockIcon} from '@chakra-ui/icons';
import Form from "./Form";
import {colorScheme} from "../config";
import {FieldI, UserI} from '../types';
import {userApi, UserEndpoint} from '../api';

const fields: Array<FieldI> = [
  {
    id: 'username',
    label: 'Username',
    required: true,
    type: 'text',
    minLength: 3,
    icon: <AtSignIcon />
  },
  {
    id: 'password',
    label: 'Password',
    required: true,
    type: 'password',
    minLength: 5,
    icon: <LockIcon />
  }
];

interface LoginProps {
  setId: (id: string) => void
}

function Login({setId}: LoginProps) {

  const toast = useToast();
  const [remember, setRemember] = useState(false);

  async function onSubmit(values: UserI) {
    const {id, error} = await userApi(values, UserEndpoint.LOGIN);
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