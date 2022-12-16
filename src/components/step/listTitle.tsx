import type { FormEvent } from "react";
import { useState } from "react";
import { z, ZodError } from "zod";
import { Step } from "./listWrapper";

export const ListTitle = ({ onClick }: { onClick: () => void }) => {
  const [inputError, setInputError] = useState<string | null>(null);
  const validateSchema = z
    .object({
      listName: z.string().min(3),
    })
    .refine((data) => data.listName.length > 3, {
      message: "Listnamnet behöver innehålla minst tre ord",
    });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      validateSchema.parse(data);
      setInputError(null);
      onClick();
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
