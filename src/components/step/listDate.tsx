import { getLocalTimeZone, today } from "@internationalized/date";
import { useEffect, useMemo, useState } from "react";
import type { AnyZodObject } from "zod";
import { z } from "zod";
import { Calendar } from "../calendar/calendar";
import { ListWrapper } from "./listWrapper";
import { useValidation } from "./useValidation";

export const listDateSchema = z
  .object({
    listDate: z.string().min(3),
  })
  .refine((data) => data.listDate.length > 3, {
    message: "Listnamnet behöver innehålla minst tre ord",
  }) as unknown as AnyZodObject;

export const ListDate = ({ onClick }: { onClick: () => void }) => {
  const todaysDate = today(getLocalTimeZone());
  const [focusedDate, setFocusedDate] = useState(todaysDate);
  const { isValidated, handleSubmit } = useValidation({
    schema: listDateSchema,
  });

  useEffect(() => {
    isValidated && onClick();
  }, [isValidated, onClick]);

  const formattedDate = useMemo(() => {
    const date = new Date(focusedDate.toString());
    return date;
  }, [focusedDate]);

  return (
    <ListWrapper
      title="Till när du vill önska dig till?"
      submitTitle="Skapa din lista"
      onSubmit={handleSubmit}
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
