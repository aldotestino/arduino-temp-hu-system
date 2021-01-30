import {useToast} from '@chakra-ui/react';
import {serverUrl} from '../config';
import {FieldI, UserI} from '../types';
import Form from "./Form";

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

interface RegisterProps {
  setId: (id: string) => void
}

function Register({setId}: RegisterProps) {

  const toast = useToast();

  async function onSubmit(values: UserI) {
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