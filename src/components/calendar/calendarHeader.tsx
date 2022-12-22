import { useDateFormatter } from "@react-aria/i18n";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import type { DOMAttributes, FocusableElement } from "@react-types/shared";
import type { AriaButtonProps } from "react-aria";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import type { CalendarState } from "react-stately";
import { Button } from "./button";

interface CalendarHeaderProps {
  state: CalendarState;
  calendarProps: DOMAttributes<FocusableElement>;
  prevButtonProps: AriaButtonProps<"button">;
  nextButtonProps: AriaButtonProps<"button">;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  state,
  calendarProps,
  prevButtonProps,
  nextButtonProps,
}) => {
  const monthDateFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    timeZone: state.timeZone,
  });

  return (
    <div className="flex items-center">
      {/* Add a screen reader only description of the entire visible range rather than
       * a separate heading above each month grid. This is placed first in the DOM order
       * so that it is the first thing a touch screen reader user encounters.
       * In addition, VoiceOver on iOS does not announce the aria-label of the grid
       * elements, so the aria-label of the Calendar is included here as well. */}
      <VisuallyHidden>
        <h2>{calendarProps["aria-label"]}</h2>
      </VisuallyHidden>
      <Button {...prevButtonProps}>
        <IoIosArrowBack className="h-6 w-6" />
      </Button>
      <h2
        // We have a visually hidden heading describing the entire visible range,
        // and the calendar itself describes the individual month
        // so we don't need to repeat that here for screen reader users.
        aria-hidden
        className="align-center flex-1 text-center text-xl font-bold text-white"
      >
        {monthDateFormatter.format(
          state.visibleRange.start.toDate(state.timeZone)
        )}
      </h2>
      <Button {...nextButtonProps}>
        <IoIosArrowForward className="h-6 w-6" />
      </Button>
    </div>
  );
};
