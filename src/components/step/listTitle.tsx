import { z } from "zod";
import { useZodForm } from "../../pages";
import { useCreateListStore } from "../../store/list";
import { ListWrapper } from "./listWrapper";

interface ListTitleProps {
  onSubmit: () => void;
}

const schema = z.object({
  listName: z
    .string()
    .min(3, { message: "Listnamnet behöver innehålla minst tre ord" }),
});

export const ListTitle: React.FC<ListTitleProps> = ({ onSubmit }) => {
  const setListName = useCreateListStore((state) => state.setListName);
  const listName = useCreateListStore((state) => state.formValue.listName);
  const methods = useZodForm({
    schema,
    defaultValues: {
      listName,
    },
  });

  return (
    <ListWrapper
      title="Vad vill du döpa din lista till?"
      submitTitle="Skapa din lista"
      onSubmit={methods.handleSubmit((values) => {
        setListName(values.listName);
        onSubmit();
      })}
    >
      <div className="flex flex-col items-start justify-between gap-1">
        <label className="text-gray-400" htmlFor="listName">
          Titel
        </label>
        <div className="flex w-full flex-col">
          <input
            type="text"
            id="listName"
            className="w-full rounded-md border-2 border-gray-600 bg-gray-700 p-2 text-white placeholder:text-gray-500"
            placeholder="Namnet på din önskelista"
            {...methods.register("listName")}
          />
          {methods.formState.errors.listName && (
            <p className="text-red-500">
              {methods.formState?.errors?.listName.message?.toString()}
            </p>
          )}
        </div>
      </div>
    </ListWrapper>
  );
};
