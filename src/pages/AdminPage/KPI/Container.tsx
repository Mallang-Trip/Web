import { memo, useMemo } from "react";

interface Props {
  name: string;
  child: (string | number)[][];
}

function Container({ name, child }: Props) {
  const unit = useMemo(
    () => (name.endsWith("수") ? " 회" : name.endsWith("률") ? "%" : "명"),
    [name]
  );

  return (
    <div className="w-full whitespace-nowrap mb-12">
      <div className="text-boldgray text-lg font-semibold mb-2">{name}</div>
      <div className="grid grid-cols-3 gap-12 border-solid border border-mediumgray rounded-2xl px-12 py-10 w-full min-w-max">
        {child.map(([label, value], index) => (
          <div
            key={index}
            className="flex flex-col text-boldgray text-lg font-bold"
          >
            <div className="mb-2">{label}</div>
            <div className="flex text-gray900 text-3xl font-bold">
              {value}
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Container);
