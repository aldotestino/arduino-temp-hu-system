import {ReactNode, useState} from "react";
import {FormControl, FormLabel, Input, Button, Box, VStack} from '@chakra-ui/react';
import {useForm, FieldValues} from "react-hook-form";
import {colorScheme} from "../config";
import {FieldI} from "../types";

interface FormProps {
  fields: Array<FieldI>,
  onSubmit: (values: FieldValues) => void,
  submitLabel: string,
  children?: ReactNode
}

function Form({fields, onSubmit, submitLabel, children}: FormProps) {

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

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
            <FormControl id={f.id} isRequired={f.required} key={i}>
              <FormLabel>{f.label}</FormLabel>
              <Input type={f.type} placeholder={f.label} name={f.id} ref={register} />
            </FormControl>
          ))}
          {children}
          <Button isLoading={loading} colorScheme={colorScheme} type="submit">{submitLabel}</Button>
        </VStack>
      </form>
    </Box>
  );
}

export default Form;