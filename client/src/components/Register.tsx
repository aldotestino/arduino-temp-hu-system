import {useToast} from '@chakra-ui/react';
import {FieldValues} from 'react-hook-form';
import {serverUrl} from '../config';
import {FieldI} from '../types';
import Form from "./Form";

interface RegisterProps {
  setId: (id: string) => void
}

function Register({setId}: RegisterProps) {

  const toast = useToast();

  const fields: Array<FieldI> = [
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

  async function onSubmit(values: FieldValues) {
    const {id, error}: {id: string | undefined, error: string | undefined} = await  fetch(serverUrl+'/user/register', {
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
    if(id) {
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
  }

  return (
    <Form fields={fields} onSubmit={onSubmit} submitLabel="Registrati" />
  );
}

export default Register;