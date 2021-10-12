import {useToast} from '@chakra-ui/react';
import {AtSignIcon, InfoOutlineIcon, LockIcon} from '@chakra-ui/icons';
import {userApi, UserEndpoint} from '../api';
import {FieldI, UserI} from '../types';
import Form from './Form';

const fields: Array<FieldI> = [
  {
    id: 'name',
    label: 'Nome',
    required: false,
    type: 'text',
    icon: <InfoOutlineIcon />
  },
  {
    id: 'surname',
    label: 'Cognome',
    required: false,
    type: 'text',
    icon: <InfoOutlineIcon />
  },
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

interface RegisterProps {
  setId: (id: string) => void
}

function Register({setId}: RegisterProps) {

  const toast = useToast();

  async function onSubmit(values: UserI) {
    const {id, error} = await userApi(values, UserEndpoint.REGISTER);
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
    <Form fields={fields} onSubmit={onSubmit} submitLabel='Registrati' />
  );
}

export default Register;