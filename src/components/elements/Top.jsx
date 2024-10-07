import React from "react";
export const TopObject = {
  text: "",
  object: null
}
export default function Top({ value, x, y, radius, bgColor = 'black', color = "black", onMouseDown }) {
  return (
    <>
      <circle cx={x} cy={y} r={radius} fill={bgColor} onMouseDown={onMouseDown}/>
      <text x={x} y={y - radius - 5} fill={color} textAnchor="middle" dominantBaseline="middle">{value}</text>
    </>
  );
}
