import {
  Radio as Radioo,
  RadioGroup,
  Stack,
  useRadioGroup,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import { AiOutlineEnter } from "react-icons/ai";
import { BiSpaceBar } from "react-icons/bi";
import React from "react";

interface RadioFieldProps {
  name: string;
  type: string;
  //   value:
}
// const radioOptions = [
// //   { key: "Option 1", value: "value 1" },
// //   { key: "Option 2", value: "value 2" },
// //   { key: "Option 3", value: "value 3" },
// ];
// const radioOptions = ["react", "vue", "svelte"];
// const radioOptions = ["1", "2", "3", "4", "5"];
const radioOptions = [
  {
    id: "0",
    value: ";",
  },
  {
    id: "1",
    value: ",",
  },
  {
    id: "2",
    value: "/",
  },
  {
    id: "3",
    value: <BiSpaceBar />,
  },
  {
    id: "4",
    value: <AiOutlineEnter />,
  },
];

export const RadioField: React.FC<RadioFieldProps> & FieldHookConfig<string> = (
  props,
  name
) => {
  const [field, { error }] = useField(props);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue: "1",
  });

  return (
    <RadioGroup {...field} {...props}>
      <Stack direction="row" {...field}>
        {radioOptions.map((value) => {
          const radio = getRadioProps({ value: value.id });
          // console.log(radio);

          return (
            // {...getInputProps({})}
            <Radioo
              key={value.id}
              {...radio}
              value={value.id}
              // {...field}s
              {...props}
              // onChange={(e) => console.log(e.target.value)}
            >
              {value.value}
            </Radioo>
          );
        })}
      </Stack>
    </RadioGroup>
  );
};
