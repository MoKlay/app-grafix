import React from "react";
export const TopObject = {
  text: "",
  object: {}
}
export default function Top({ value, x, y, radius, bgColor = 'black', color = "black", onMouseDown, onClick, onMouseUp}) {
  return (
    <>
      <circle cx={x} cy={y} r={radius} fill={bgColor} onMouseDown={onMouseDown} onClick={onClick} onMouseUp={onMouseUp}/>
      <text x={x} y={y - radius - 5} fill={color} textAnchor="middle" dominantBaseline="middle">{value}</text>
    </>
  );
}
