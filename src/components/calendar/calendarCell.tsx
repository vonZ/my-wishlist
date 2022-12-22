import type { CalendarDate, DateValue } from "@internationalized/date";
import { isSameMonth } from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useRef } from "react";
import type { CalendarState } from "react-stately";

export const CalendarCell = ({
  state,
  date,
  currentMonth,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: DateValue;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref);
  const isOutsideMonth = !isSameMonth(currentMonth, date);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      className={`relative py-0.5 ${isFocusVisible ? "z-10" : "z-0"}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className={`group m-auto h-10 w-10 outline-none ${
          isSelected
            ? "rounded-full bg-gradient-to-bl from-pink-500 to-orange-400"
            : ""
        } ${isDisabled ? "disabled" : ""}`}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full ${
            isDisabled ? "text-gray-400" : "text-gray-100"
          } ${
            // Focus ring, visible while the cell has keyboard focus.
            isFocusVisible
              ? "group-focus:z-2 ring-2 ring-pink-800 ring-offset-2"
              : ""
          } ${
            // Hover state for non-selected cells.
            !isSelected && !isDisabled
              ? "from-pink-500 to-orange-400 hover:bg-gradient-to-br "
              : ""
          } cursor-default`}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  );
};
