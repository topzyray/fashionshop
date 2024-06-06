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
      <p className="absolute bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600">
        {label}
      </p>
      <input
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onChange={onChange}
        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
      />
    </div>
  );
}
