import React, { ReactNode } from "react";

export default function DropdownWrapper({
  children,
  onDelete,
}: {
  children: ReactNode;
  onDelete?: () => void;
}) {
  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost p-0 hover:bg-transparent m-1"
      >
        {children}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
      >
        <li>
          <a>Update</a>
        </li>
        <li>
          <a onClick={onDelete}>Delete</a>
        </li>
      </ul>
    </div>
  );
}
