import type { FormEvent } from "react";

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
    <div className="flex flex-col gap-12 p-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-left text-xl font-medium text-white">{title}</h1>
        <p className="text-gray-400">
          This is your organization`s name within Supabase.
          <br />
          For example, you can use the name of your company or department.
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {children}
        <button
          type="submit"
          className="mb-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
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
    </div>
  );
};
