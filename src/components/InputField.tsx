import {
  FormControl,
  FormLabel,
  Textarea,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import React from "react";

interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  textarea?: boolean;
}

export const InputField: React.FC<InputFieldProps> &
  FieldHookConfig<string> = ({ textarea, ...props }) => {
  let C = Input;
  if (textarea) {
    C = Textarea as any;
  }

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <C
        {...field}
        {...props}
        autoComplete="true"
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
