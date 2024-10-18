import React from "react";
export const TopObject = {
  text: null,
  object: {}
}
export default function Top({ value, fontSize = 20, x, y, radius, bgColor = 'black', color = "black", onMouseDown, onClick, onMouseUp}) {
  return (
    <>
      <circle cx={x} cy={y} r={radius} fill={bgColor} onMouseDown={onMouseDown} onClick={onClick} onMouseUp={onMouseUp}/>
      <text style={{transition: 'all.3s ease-in-out'}} x={x} y={y - radius - 8} fontSize={fontSize} fontWeight={900} fill={color} textAnchor="middle" dominantBaseline="middle">{value}</text>
    </>
  );
}
