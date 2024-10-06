import React, { useState } from "react";
import { MarkerConections } from "../elements/Connection";
import Top from "../elements/Top";

export default function GraphInterface({
  tops,
  connections,
  onMouseMove,
  onClick,
}) {
  const [isDragging, setIsDragging] = useState(null);

  return (
    <svg
      className="graph-interface"
      onMouseUp={() => setIsDragging(null)}
      onMouseMove={(e) => {
        isDragging && onMouseMove(e, isDragging);
      }}
      onClick={onClick}
    >
      <MarkerConections />
      {tops &&
        Object.entries(tops).map(([value, top]) => {
          return (
            <Top
              key={value}
              x={top.x}
              y={top.y}
              value={value}
              radius={12}
              onMouseDown={() => setIsDragging(value)}
            />
          );
        })}
    </svg>
  );
}
