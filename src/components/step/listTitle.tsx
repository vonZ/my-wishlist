import { useEffect } from "react";
import type { AnyZodObject } from "zod";
import { z } from "zod";
import { Step } from "./listWrapper";
import { useValidation } from "./useValidation";

export const listTitleSchema = z
  .object({
    listName: z.string().min(3),
  })
  .refine((data) => data.listName.length > 3, {
    message: "Listnamnet behöver innehålla minst tre ord",
  }) as unknown as AnyZodObject;

export const ListTitle = ({ onClick }: { onClick: () => void }) => {
  const { inputError, isValidated, setInputError, handleSubmit } =
    useValidation({ schema: listTitleSchema });

  useEffect(() => {
    isValidated && onClick();
  }, [isValidated, onClick]);

  return (
    <Step
      title="Vad vill du döpa din lista till?"
      submitTitle="Skapa din lista"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label className="text-white" htmlFor="listName">
          Önskelistnamn
        </label>
        <input
          className="rounded-sm border-2 border-gray-300 p-2"
          onChange={() => setInputError(null)}
          id="listName"
          name="listName"
          type="text"
        />
        {inputError && <p className=" text-red-500">{inputError}</p>}
      </div>
    </Step>
  );
};
