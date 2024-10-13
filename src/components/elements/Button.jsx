import classNames from "classnames";
import React, { useState } from "react";

export const ICONS = {
  add: (
    <svg fill="currentColor" viewBox="0 0 16 16" style={{ transform: 'scale(1.2)' }}>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
    </svg>
  ),

  cursor: (
    <svg fill="currentColor" viewBox="0 0 16 16" >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z" />
    </svg>
  ),
  vector: (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      style={{ transform: 'rotate(45deg) scale(0.8)' }}
    >
      <path
        fill-rule="evenodd"
        d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
      />
    </svg>
  ),
  arrow: (
    <svg fill="currentColor" viewBox="0 0 16 16">
      <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
    </svg>
  )

};
export function ListButton({ icon, children, title }) {
  const [openList, setOpenList] = useState(false);
  let timeout = null;
  return (
    <div
      className="list-btn"
      onMouseLeave={(e) =>
        (timeout = setTimeout(() => setOpenList(false), 1000))
      }
      onMouseEnter={(e) => timeout && clearTimeout(timeout)}
    >
      <div onClick={(e) => setOpenList(!openList)} className="btnTool">{icon}</div>
      {title && <p>{title}</p>}
      <div
        className={classNames("list-btn__list", { open: openList })}
        style={{ position: "absolute" }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Button({
  icon,
  onClick,
  className = [],
  description,
  children,
}) {
  return (
    <button
      className={classNames("btnTool", { text: children }, ...className)}
      onClick={onClick}
      data-tooltitle={description}
    >
      {icon}
      {children}
    </button>
  );
}
