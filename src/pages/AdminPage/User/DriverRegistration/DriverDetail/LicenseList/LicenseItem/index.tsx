import { memo } from "react";

interface Props {
  title: string;
  image: string;
}

function LicenseItem({ title, image }: Props) {
  return (
    <div>
      <p className="text-center text-sm text-gray700 font-medium mb-2">
        {title}
      </p>
      <img className="w-80 mx-auto object-cover rounded-lg" src={image} />
    </div>
  );
}

export default memo(LicenseItem);
