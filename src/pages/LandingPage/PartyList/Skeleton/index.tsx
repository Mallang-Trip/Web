import { memo } from "react";

interface Props {
  count: number;
}

function Skeleton({ count }: Props) {
  return (
    <div className="grid grid-cols-1 gap-10 mt-6 mx-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {new Array(count).fill(0).map((_, index) => (
        <div
          key={index}
          className="h-64 rounded-lg w-full animate-pulse bg-gray-200"
        />
      ))}
    </div>
  );
}

export default memo(Skeleton);
