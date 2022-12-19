import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useRef } from "react";

export const Button = (props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`rounded-full p-2 ${
        props.isDisabled ? "text-gray-400" : "text-white"
      } outline-none ${
        isFocusVisible ? "ring-2 ring-purple-600 ring-offset-2" : ""
      }`}
    >
      {props.children}
    </button>
  );
};
