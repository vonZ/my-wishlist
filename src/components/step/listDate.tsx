import { getLocalTimeZone, today } from "@internationalized/date";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useZodForm } from "../../pages/create";
import { useCreateListStore } from "../../store/list";
import { Calendar } from "../calendar/calendar";
import { ListWrapper } from "./listWrapper";

interface ListDateProps {
  onSubmit: () => void;
}

const schema = z.object({
  dueDate: z.date(),
});

export const ListDate: React.FC<ListDateProps> = ({ onSubmit }) => {
  const setDueDate = useCreateListStore((state) => state.setDueDate);
  const dueDate = useCreateListStore((state) => state.formValue.dueDate);
  const todaysDate = today(getLocalTimeZone());
  const [focusedDate, setFocusedDate] = useState(todaysDate);
  const methods = useZodForm({ schema, defaultValues: { dueDate } });

  const formattedDate = useMemo(() => {
    const date = new Date(focusedDate.toString());
    return date;
  }, [focusedDate]);

  useEffect(() => {
    methods.setValue("dueDate", formattedDate);
  }, [formattedDate, methods]);

  return (
    <ListWrapper
      title="Till när du vill önska dig till?"
      submitTitle="Skapa din lista"
      onSubmit={methods.handleSubmit(() => {
        setDueDate(formattedDate);
        onSubmit();
      })}
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
