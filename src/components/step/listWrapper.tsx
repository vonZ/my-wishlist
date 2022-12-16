import { motion } from "framer-motion";
import type { FormEvent } from "react";

interface StepProps {
  title: string;
  submitTitle: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({
  children,
  title,
  submitTitle,
  onSubmit,
}) => {
  return (
    <motion.div
      className="flex flex-col gap-4 rounded-md border-t-4 border-white bg-gray-800 p-10 shadow-md"
      animate={{ x: -208 }}
      transition={{ type: "spring", delay: 0 }}
    >
      <h1 className="text-3xl font-medium text-white">{title}</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {children}
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {submitTitle}
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </form>
    </motion.div>
  );
};
