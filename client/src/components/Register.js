import {useToast} from '@chakra-ui/react';
import { serverUrl } from '../config';
import Form from "./Form";

function Register({setId}) {

  const toast = useToast();

  const fields = [
    {
      id: 'name',
      label: 'Nome',
      required: false,
      type: 'text'
    },
    {
      id: 'surname',
      label: 'Cognome',
      required: false,
      type: 'text'
    },
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
    const {id, error} = await  fetch(serverUrl+'/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(r => r.json());
    if(error) {
      toast({
        title: 'Registrazione',
        description: error,
        duration: 5000,
        status: 'error',
        isClosable: true,
        position: 'top-right'
      });
      return;
    }
    setId(id);
    toast({
      title: 'Registrazione',
      description: 'Utente registrato con successo!',
      duration: 5000,
      status: 'success',
      isClosable: true,
      position: 'top-right'
    });
  }

  return (
    <Form fields={fields} onSubmit={onSubmit} submitLabel="Registrati" />
  );
}

export default Register;