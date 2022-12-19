import { createCalendar } from "@internationalized/date";
import { useRangeCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useRangeCalendarState } from "@react-stately/calendar";
import { useRef } from "react";
import { CalendarGrid } from "./calendarGrid";
import { CalendarHeader } from "./calendarHeader";

export const RangeCalendar = (props) => {
  const { locale } = useLocale();
  const state = useRangeCalendarState({
    ...props,
    visibleDuration: { months: 2 },
    locale,
    createCalendar,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { calendarProps, prevButtonProps, nextButtonProps } = useRangeCalendar(
    props,
    state,
    ref
  );

  return (
    <div {...calendarProps} ref={ref} className="inline-block text-gray-800">
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <div className="flex gap-8">
        <CalendarGrid state={state} />
        <CalendarGrid state={state} offset={{ months: 1 }} />
      </div>
    </div>
  );
};
