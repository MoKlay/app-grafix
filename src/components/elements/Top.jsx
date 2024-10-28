import React, { useState } from "react";

export function useCreateTops() {
  const [tops, setTops] = useState(TopObject)

  function update(tops) {
    setTops({
      text: Object.keys(tops).join(', '),
      mass: Object.keys(tops),
      tops
    })
  }

  return [tops, update]
}

export const TopObject = {
  text: "",
  mass: [],
  tops: {}
}

export default function Top({ value, x, y, radius, bgColor = 'black', color = "black", onMouseDown, onClick, onMouseUp}) {
  return (
    <>
      <circle cx={x} cy={y} r={radius} fill={bgColor} onMouseDown={onMouseDown} onClick={onClick} onMouseUp={onMouseUp}/>
      <text x={x} y={y - radius - 5} fill={color} textAnchor="middle" dominantBaseline="middle">{value}</text>
    </>
  );
}
