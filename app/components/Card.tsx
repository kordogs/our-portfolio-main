import { EllipsisIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import DropdownWrapper from "./DropdownWrapper";

interface CardProps {
  title: string;
  description: string;
  image: string;
  onDelete?: () => void;
  onUpdate?: () => void;
}

export default function Card({
  title,
  description,
  image,
  onDelete,
  onUpdate,
}: CardProps) {
  return (
    <div className="skeleton card rounded-lg bg-gray-800 bg-opacity-50 w-full">
      <span className="absolute right-1 top-1 text-white badge">
        <DropdownWrapper onDelete={onDelete} onUpdate={onUpdate}>
          <EllipsisIcon />
        </DropdownWrapper>
      </span>
      <Image
        src={image ? image : "https://via.placeholder.com/300"}
        height={300}
        width={400}
        alt="thumbnail"
        className=" rounded-t-lg w-full"
      />
      <div className="p-5">
        <h1 className=" text-2xl font-bold mb-2">
          {title ? title : "No title"}
        </h1>
        <span
          className="text-xs text-start tooltip tooltip-bottom"
          data-tip={description}
        >
          {description
            ? description.split(" ").slice(0, 50).join(" ") +
              (description.split(" ").length > 50 ? "..." : "")
            : "No description"}
        </span>
      </div>
    </div>
  );
}
