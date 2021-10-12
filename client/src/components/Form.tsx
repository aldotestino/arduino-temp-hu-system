import {ReactNode, useState} from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  VStack,
  InputGroup,
  InputLeftElement,
  FormErrorMessage
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {colorScheme} from '../config';
import {FieldI, UserI} from '../types';

interface FormProps {
  fields: Array<FieldI>,
  onSubmit: (values: UserI) => void,
  submitLabel: string,
  children?: ReactNode
}

function Form({fields, onSubmit, submitLabel, children}: FormProps) {

  const [loading, setLoading] = useState(false);
  const {register, handleSubmit, reset, errors} = useForm<UserI>();

  return (
    <Box w={300}>
      <form onSubmit={handleSubmit(async values => {
        setLoading(true);
        await onSubmit(values);
        setLoading(false);
        reset();
      })}>
        <VStack spacing={4}>
          {fields.map((f,i) => (
            <FormControl isInvalid={!!errors[f.id]} isRequired={f.required} id={f.id} key={i}>
              <FormLabel>{f.label}</FormLabel>
              {f.icon ? 
              <InputGroup>
                <InputLeftElement pointerEvents='none' children={f.icon} /> 
                <Input type={f.type} 
                       placeholder={f.label} 
                       name={f.id} 
                       ref={register({
                         required: {
                           value: f.required,
                           message: 'Questo campo è obbligatorio'
                         },
                         minLength: {
                           value: f.minLength!,
                           message: `Questo campo richiede almeno ${f.minLength} caratteri`
                         }
                       })}
                />
              </InputGroup> :
                <Input type={f.type}
                       placeholder={f.label} 
                       name={f.id} 
                       ref={register({
                         required: {
                           value: f.required,
                           message: 'Questo campo è obbligatorio'
                         },
                         minLength: {
                           value: f.minLength!,
                           message: `Questo campo richiede almeno ${f.minLength} caratteri`
                         }
                       })}
                />
              }
              <FormErrorMessage>{errors[f.id]?.message}</FormErrorMessage>
            </FormControl>
          ))}
          {children}
          <Button isDisabled={Object.values(errors).some(f => f !== undefined)}
                  isLoading={loading}
                  colorScheme={colorScheme}
                  type='submit'>{submitLabel}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default Form;