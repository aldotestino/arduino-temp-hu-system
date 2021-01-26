import {useState} from 'react';
import {useToast, Checkbox} from '@chakra-ui/react';
import Form from "./Form";
import {colorScheme, serverUrl} from "../config";

function Login({setId}) {

  const toast = useToast();
  const [remember, setRemember] = useState(false);

  const fields = [
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

  async function onSubmit(values) {
    const {id, error} = await  fetch(serverUrl+'/user/login', {
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
    if(remember) {
      localStorage.setItem('id', id);
    }
    setId(id);
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