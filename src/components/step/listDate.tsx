import { getLocalTimeZone, today } from "@internationalized/date";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useCreateListStore } from "../../pages/create";
import { Calendar } from "../calendar/calendar";
import { ListWrapper } from "./listWrapper";
import { useValidation } from "./useValidation";

export const listDateSchema = z.object({
  listDate: z.date(),
});

export const ListDate = ({ onClick }: { onClick: () => void }) => {
  const todaysDate = today(getLocalTimeZone());
  const [focusedDate, setFocusedDate] = useState(todaysDate);
  const setDueDate = useCreateListStore((state) => state.setDueDate);
  const { isValidated, handleSubmit } = useValidation({
    schema: listDateSchema,
  });

  const formattedDate = useMemo(() => {
    const date = new Date(focusedDate.toString());
    return date;
  }, [focusedDate]);

  useEffect(() => {
    if (isValidated) {
      setDueDate(formattedDate);
      onClick();
    }
  }, [formattedDate, isValidated, onClick, setDueDate]);

  return (
    <ListWrapper
      title="Till när du vill önska dig till?"
      submitTitle="Skapa din lista"
      onSubmit={(event) => {
        const listDate = new Date(focusedDate.toString());
        handleSubmit({ event, data: { listDate } });
      }}
    >
      <div className="flex justify-around">
        <div className="flex flex-col items-center gap-1">
          <Calendar
            minValue={today(getLocalTimeZone())}
            defaultValue={today(getLocalTimeZone())}
            focusedValue={focusedDate}
            onFocusChange={setFocusedDate}
          />
        </div>
        <div>
          <button
            type="button"
            className="text-white"
            onClick={() => setFocusedDate(todaysDate)}
          >
            Back to selected date
          </button>
          <p className="text-white">{formattedDate.getDate()}</p>
        </div>
      </div>
    </ListWrapper>
  );
};
