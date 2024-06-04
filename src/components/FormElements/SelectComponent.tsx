export type OptionType = {
  label: string;
  id: string;
};

type SelectComponentProps = {
  label: string;
  value: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: OptionType[] | undefined;
};

export default function SelectComponent({
  label,
  value,
  onChange,
  options,
}: SelectComponentProps) {
  return (
    <div className="relative">
      <p className="absolute bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600">
        {label}
      </p>
      <select
        value={value}
        onChange={onChange}
        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
      >
        {options && options.length ? (
          options.map((optionItems: OptionType) => (
            <option
              key={optionItems.id}
              id={optionItems.id}
              value={optionItems.id}
            >
              {optionItems.label}
            </option>
          ))
        ) : (
          <option id="" value={""}>
            Select
          </option>
        )}
      </select>
    </div>
  );
}
