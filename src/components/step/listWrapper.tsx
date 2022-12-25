import type { FormEvent } from "react";
import { HiArrowSmRight } from "react-icons/hi";

interface StepProps {
  title: string;
  submitTitle: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const ListWrapper: React.FC<StepProps> = ({
  children,
  title,
  submitTitle,
  onSubmit,
}) => {
  return (
    <div className="flex flex-col gap-6 p-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-left text-xl font-medium text-white">{title}</h1>
        <p className="text-gray-400">
          This is your organization`s name within Supabase.
          <br />
          For example, you can use the name of your company or department.
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {children}
        <button
          type="submit"
          className="mb-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          {submitTitle}
          <HiArrowSmRight size="1.5rem" />
        </button>
      </form>
    </div>
  );
};
