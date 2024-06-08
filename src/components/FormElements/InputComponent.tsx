import { SizesType } from "../CommonListing";

type InputComponentProps = {
  label: string;
  placeholder: string;
  type?: string;
  value: string | number | SizesType[] | [] | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputComponent({
  label,
  placeholder,
  type,
  value,
  onChange,
}: InputComponentProps) {
  return (
    <div className="relative">
      <p className="absolute bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 text-sm sm:text-base font-medium text-gray-600">
        {label}
      </p>
      <input
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onChange={onChange}
        className="border placeholder-gray-400 focus:outline-none focus:border-dark-blue w-full pt-2.5 pr-4 pb-2.5 pl-4 sm:pt-3 sm:pb-3 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
      />
    </div>
  );
}
