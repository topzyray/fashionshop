type DataItemType = {
  id: string;
  label: string;
};

type TileComponentProps = {
  data: DataItemType[];
  selected: [];
  onClick: () => void;
};

export default function TileComponent({
  data,
  selected = [],
  onClick,
}: TileComponentProps) {
  return data && data.length ? (
    <div className="mt-3 flex flex-wrap items-center gap-1">
      {data.map(({ id, label }: DataItemType) => (
        <label key={id} className="cursor-pointer">
          <span className="rounded-lg border border-black px-6 py-2 font-bold">
            {label}
          </span>
        </label>
      ))}
    </div>
  ) : null;
}
