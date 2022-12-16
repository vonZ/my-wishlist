import { useEffect } from "react";
import type { AnyZodObject } from "zod";
import { z } from "zod";
import { Step } from "./listWrapper";
import { useValidation } from "./useValidation";

export const listDateSchema = z
  .object({
    listDate: z.string().min(3),
  })
  .refine((data) => data.listDate.length > 3, {
    message: "Listnamnet behöver innehålla minst tre ord",
  }) as unknown as AnyZodObject;

export const ListDate = ({ onClick }: { onClick: () => void }) => {
  const { inputError, isValidated, setInputError, handleSubmit } =
    useValidation({ schema: listDateSchema });

  useEffect(() => {
    isValidated && onClick();
  }, [isValidated, onClick]);

  return (
    <Step
      title="Till när du vill önska dig till?"
      submitTitle="Skapa din lista"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label className="text-white" htmlFor="listDate">
          Datum för din lista
        </label>
        <input
          className="rounded-sm border-2 border-gray-300 p-2"
          onChange={() => setInputError(null)}
          id="listDate"
          name="listDate"
          type="text"
        />
        {inputError && <p className=" text-red-500">{inputError}</p>}
      </div>
    </Step>
  );
};
