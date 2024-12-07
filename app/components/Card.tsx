import { EllipsisIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import DropdownWrapper from "./DropdownWrapper";

interface CardProps {
  title: string;
  description: string;
  image: string;
  onDelete?: () => void;
}

export default function Card({
  title,
  description,
  image,
  onDelete,
}: CardProps) {
  return (
    <div className="card rounded-lg bg-gray-800 bg-opacity-50 w-[300px]">
      <span className="absolute right-1 top-1 text-white badge">
        <DropdownWrapper onDelete={onDelete}>
          <EllipsisIcon />
        </DropdownWrapper>
      </span>
      <Image
        src={image ? image : "https://via.placeholder.com/300"}
        height={300}
        width={300}
        alt="thumbnail"
        className=" rounded-t-lg"
      />
      <div className="p-5">
        <h1 className=" text-2xl font-bold mb-2">
          {title ? title : "No title"}
        </h1>
        <span className="text-xs">
          {description ? description : "No description"}
        </span>
      </div>
    </div>
  );
}
