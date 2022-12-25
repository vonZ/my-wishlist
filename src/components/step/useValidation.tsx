import type { FormEvent } from "react";
import { useState } from "react";
import type { AnyZodObject, z } from "zod";
import { ZodError } from "zod";
import type { listDateSchema } from "./listDate";
import type { listTitleSchema } from "./listTitle";

export type ListTitleSchema = z.TypeOf<typeof listTitleSchema>;
export type ListDateSchema = z.TypeOf<typeof listDateSchema>;

export const useValidation = ({ schema }: { schema: AnyZodObject }) => {
  const [inputError, setInputError] = useState<string | null>(null);
  const [isValidated, setIsValidated] = useState<boolean>(false);

  const validateSchema = (
    schema: AnyZodObject,
    data: {
      [k: string]: Date | FormDataEntryValue;
    }
  ) => {
    try {
      schema.parse(data);
      setInputError(null);
      setIsValidated(true);
    } catch (err) {
      if (err instanceof ZodError) {
        const { issues } = err;
        const errorCode = issues.find(
          (item) => item.code === "custom"
        )?.message;
        errorCode && setInputError(errorCode);
      }
    }
  };

  const handleSubmit = ({
    event,
    data,
  }: {
    data: { [k: string]: Date | FormDataEntryValue };
    event: FormEvent<HTMLFormElement>;
  }) => {
    event.preventDefault();
    validateSchema(schema, data);
  };

  return { inputError, isValidated, handleSubmit, setInputError };
};
