import { useEffect, useState } from "react";
import type { AnyZodObject } from "zod";
import { z } from "zod";
import { useCreateListStore } from "../../pages/create";
import { ListWrapper } from "./listWrapper";
import { useValidation } from "./useValidation";

export const listTitleSchema = z
  .object({
    listName: z.string().min(3),
  })
  .refine((data) => data.listName.length > 3, {
    message: "Listnamnet behöver innehålla minst tre ord",
  }) as unknown as AnyZodObject;

export const ListTitle = ({ onClick }: { onClick: () => void }) => {
  const listName = useCreateListStore(
    (state) => state.formValue?.listName ?? ""
  );
  const [inputValue, setInputValue] = useState(listName);
  const setListName = useCreateListStore((state) => state.setListName);

  const { inputError, isValidated, setInputError, handleSubmit } =
    useValidation({ schema: listTitleSchema });

  useEffect(() => {
    if (isValidated) {
      setListName(inputValue);
      onClick();
    }
  }, [inputValue, isValidated, onClick, setListName]);

  return (
    <ListWrapper
      title="Vad vill du döpa din lista till?"
      submitTitle="Skapa din lista"
      onSubmit={(event) => {
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        handleSubmit({ event, data });
      }}
    >
      <div className="flex flex-col items-start justify-between gap-1">
        <label className="text-gray-400" htmlFor="listName">
          Titel
        </label>
        <div className="flex w-full flex-col">
          <input
            className="w-full rounded-md border-2 border-gray-600 bg-gray-700 p-2 text-white placeholder:text-gray-500"
            onChange={(e) => {
              setInputValue(e.currentTarget.value);
              setInputError(null);
            }}
            autoFocus
            value={inputValue}
            id="listName"
            name="listName"
            placeholder="Namnet på din önskelista"
            type="text"
          />
          {inputError && <p className=" text-red-500">{inputError}</p>}
        </div>
      </div>
    </ListWrapper>
  );
};
