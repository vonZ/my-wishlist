import type { CalendarDate } from "@internationalized/date";
import { createCalendar } from "@internationalized/date";
import { useCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useCalendarState } from "@react-stately/calendar";
import type { Dispatch, SetStateAction } from "react";
import { CalendarGrid } from "./calendarGrid";
import { CalendarHeader } from "./calendarHeader";

interface CalendarProps {
  minValue: CalendarDate;
  defaultValue: CalendarDate;
  focusedValue: CalendarDate;
  onFocusChange: Dispatch<SetStateAction<CalendarDate>>;
}

export const Calendar: React.FC<CalendarProps> = (props) => {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state
  );

  return (
    <div {...calendarProps} className="flex flex-col gap-4 text-gray-800">
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <div className="flex gap-8">
        <CalendarGrid state={state} offset={{ months: 0 }} />
      </div>
    </div>
  );
};
