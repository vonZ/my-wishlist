import { useEffect, useState } from "react";
import { z } from "zod";
import { useCreateListStore } from "../../pages/create";
import { ListWrapper } from "./listWrapper";
import { useValidation } from "./useValidation";

export const listBelongsToUserSchema = z.object({
  belongsToUser: z.string(),
});

export const ListSummary = ({ onClick }: { onClick: () => void }) => {
  const setBelongsToUser = useCreateListStore(
    (state) => state.setBelongsToUser
  );
  const belongsToUser = useCreateListStore(
    (state) => state.formValue?.belongsToUser ?? true
  );

  const [value, setValue] = useState(belongsToUser);

  const { isValidated, handleSubmit } = useValidation({
    schema: listBelongsToUserSchema,
  });

  useEffect(() => {
    if (isValidated) {
      setBelongsToUser(value);
      onClick();
    }
  }, [isValidated, onClick, setBelongsToUser, value]);

  return (
    <ListWrapper
      title="Är listan till dig själv?"
      submitTitle="Skapa din lista"
      onSubmit={(event) => {
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        handleSubmit({ event, data });
      }}
    >
      <div className="flex flex-col items-start justify-between gap-1">
        <div className="flex w-full flex-col">
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                type="radio"
                id="yes"
                name="belongsToUser"
                value="yes"
                checked={!!value}
                onChange={() => setValue(true)}
                className="peer hidden"
                required
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
                id="no"
                name="belongsToUser"
                value="no"
                checked={!value}
                onChange={() => setValue(false)}
                className="peer hidden"
              />
              <label
                htmlFor="no"
                className="border-gradient-to-br inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-700 bg-gray-800 from-pink-500 to-orange-400 p-5 text-gray-400 hover:bg-gray-700 hover:text-gray-300 peer-checked:border-gray-300 peer-checked:text-gray-300"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">Nej</div>
                  <div className="w-full">Önskelistan är till någon annan</div>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </ListWrapper>
  );
};
