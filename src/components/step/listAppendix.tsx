import Link from "next/link";
import { FaThinkPeaks } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useCreateListStore } from "../../store/list";

const StepSpan = ({
  title,
  showArrow = true,
}: {
  title: string;
  showArrow?: boolean;
}) => (
  <div className="flex gap-4">
    <span className="text-gray-500">{title}</span>
    {showArrow && (
      <MdKeyboardArrowRight size="1.5rem" className="text-gray-500" />
    )}
  </div>
);
const StepButton = ({
  title,
  onClick,
  showArrow = true,
}: {
  title: string;
  onClick: () => void;
  showArrow?: boolean;
}) => (
  <div className="flex gap-4">
    <button type="button" onClick={onClick} className="text-white">
      {title}
    </button>
    {showArrow && <MdKeyboardArrowRight size="1.5rem" className="text-white" />}
  </div>
);

export const ListAppendix: React.FC = () => {
  const currentStep = useCreateListStore((state) => state.currentStep);
  const setStep = useCreateListStore((state) => state.setStep);

  return (
    <div className="w-full border-b border-b-gray-600 p-6">
      <ul className="flex items-center gap-4 font-semibold">
        <li>
          <Link href="/">
            <div
              role="figure"
              className="rounded-full bg-gradient-to-bl from-pink-500 to-orange-400 p-2"
            >
              <FaThinkPeaks size="1.5rem" className="text-white" />
            </div>
          </Link>
        </li>
        <li>
          <StepButton onClick={() => setStep(1)} title="Titel för listan" />
        </li>
        <li>
          {currentStep >= 2 ? (
            <StepButton onClick={() => setStep(2)} title="Datum för listan" />
          ) : (
            <StepSpan title="Datum för listan" />
          )}
        </li>
        <li>
          {currentStep >= 3 ? (
            <StepButton
              onClick={() => setStep(3)}
              showArrow={false}
              title="Skapa din önskelista"
            />
          ) : (
            <StepSpan title="Skapa din önskelista" showArrow={false} />
          )}
        </li>
      </ul>
    </div>
  );
};
