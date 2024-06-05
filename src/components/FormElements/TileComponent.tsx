type DataItemType = {
  id: string;
  label: string;
};

type TileComponentProps = {
  data: DataItemType[];
  selected: { id: string; label: string }[];
  onClick: (getCurrentItem: { id: string; label: string }) => void;
};

export default function TileComponent({
  data,
  selected = [],
  onClick,
}: TileComponentProps) {
  return data && data.length ? (
    <div className="mt-3 flex flex-wrap items-center gap-1 gap-y-4 sm:gap-y-0">
      {data.map((dataItem: DataItemType) => (
        <label
          onClick={() => onClick(dataItem)}
          key={dataItem.id}
          className={`cursor-pointer ${
            selected &&
            selected.length &&
            selected
              .map((item: { id: string }) => item.id)
              .indexOf(dataItem.id) !== -1
              ? "bg-black text-white"
              : ""
          }`}
        >
          <span
            className={`rounded-lg border border-gray-300 px-6 py-2 font-bold ${
              selected &&
              selected.length &&
              selected
                .map((item: { id: string }) => item.id)
                .indexOf(dataItem.id) !== -1
                ? "bg-black text-white"
                : ""
            }`}
          >
            {dataItem.label}
          </span>
        </label>
      ))}
    </div>
  ) : null;
}
