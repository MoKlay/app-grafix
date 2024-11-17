import React, { useState } from "react";

export function useCreateTops() {
  const [tops, setTops] = useState(TopObject)

  function update(tops) {
    setTops({
      text: Object.keys(tops).join(', '),
      mass: Object.keys(tops),
      tops,
      length: Object.keys(tops).length,
    })
  }

  return [tops, update]
}

export const TopObject = {
  text: "",
  mass: [],
  tops: {},
  length: 0
}

export default function Top({ value, x, y, radius, bgColor = 'black', color = "black", onMouseDown, onClick, onMouseUp, onContextMenu, className}) {
  return (
    <g className={className}>
      <circle cx={x} cy={y} r={radius} fill={bgColor} onMouseDown={onMouseDown} onClick={onClick} onMouseUp={onMouseUp} onContextMenu={(e) => {
        e.preventDefault()
        
        onContextMenu && onContextMenu(e)
      }}/>
      <text x={x} y={y - radius - 5} fill={color} textAnchor="middle" dominantBaseline="middle">{value}</text>
    </g>
  );
}
