import { Controller } from "react-hook-form";
import { z } from "zod";
import shallow from "zustand/shallow";
import { useZodForm } from "../../pages";
import { useCreateListStore } from "../../store/list";
import { ListWrapper } from "./listWrapper";

interface ListSummaryProps {
  onSubmit: () => void;
}

const schema = z.object({
  belongsToUser: z.boolean(),
});

export const ListSummary: React.FC<ListSummaryProps> = ({ onSubmit }) => {
  const setBelongsToUser = useCreateListStore(
    (state) => state.setBelongsToUser,
    shallow
  );
  const belongsToUser = useCreateListStore(
    (state) => state.formValue.belongsToUser,
    shallow
  );
  const methods = useZodForm({
    schema,
    defaultValues: {
      belongsToUser,
    },
  });

  return (
    <ListWrapper
      title="Är listan till dig själv?"
      submitTitle="Skapa din lista"
      onSubmit={methods.handleSubmit((values) => {
        setBelongsToUser(values.belongsToUser);
        onSubmit();
      })}
    >
      <div className="flex flex-col items-start justify-between gap-1">
        <div className="flex w-full flex-col">
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <Controller
              control={methods.control}
              name="belongsToUser"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <li>
                    <input
                      type="radio"
                      onBlur={onBlur}
                      onChange={() => onChange(true)}
                      checked={!!value}
                      id="yes"
                      className="peer hidden"
                    />
                    <label
                      htmlFor="yes"
                      className="border-gradient-to-br inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-700 bg-gray-800 from-pink-500 to-orange-400 p-5 text-gray-400 hover:bg-gray-700 hover:text-gray-300 peer-checked:border-gray-300 peer-checked:text-gray-300"
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">Ja</div>
                        <div className="w-full">Önskelistan är till mig</div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      onBlur={onBlur}
                      id="no"
                      onChange={() => onChange(false)}
                      checked={!value}
                      className="peer hidden"
                    />
                    <label
                      htmlFor="no"
                      className="border-gradient-to-br inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-700 bg-gray-800 from-pink-500 to-orange-400 p-5 text-gray-400 hover:bg-gray-700 hover:text-gray-300 peer-checked:border-gray-300 peer-checked:text-gray-300"
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">Nej</div>
                        <div className="w-full">
                          Önskelistan är till någon annan
                        </div>
                      </div>
                    </label>
                  </li>
                </>
              )}
            />
          </ul>
        </div>
      </div>
    </ListWrapper>
  );
};
