import React, { useState } from 'react'

export function MarkerConections({refX = 15, markerHeight= 10, markerWidth = 10, color = 'black'}) {
  return (
    <defs>
        <marker id="arrow" markerWidth={markerWidth} markerHeight={markerHeight} refX={refX} refY={markerHeight/ 2} orient="auto">
            <path d="M0,3 L8,5 L0,7" fill={color}/>
        </marker>
    </defs>
  )
}

export default function Connection({value, type = 'line', x, y, x1, x2, y1, y2, market = false, color}) {
  const [loopVector, setLoopVector] = useState({})
  let typeElement;
  // eslint-disable-next-line default-case
  switch(type) {
    case 'line':
      typeElement = <line x1={x1} y1={y1} x2={x2} y2={y2} markerEnd={market && "url(#arrow)"} stroke={color} strokeWidth="2" />
      break;
    case 'loop':
      setLoopVector({
        x1: x + Math.random() *1000 -500,
        y1: y + Math.random() *1000 -500,
        x2: x + Math.random() *1000 -500,
        y2: y + Math.random() *1000 -500,
      })
      // eslint-disable-next-line no-unused-vars
      typeElement = <path
          d={`M ${x} ${y} C ${loopVector.x1} ${loopVector.y1} ${loopVector.x2} ${loopVector.y2} ${x} ${y}`}
          stroke={color}
          fill="none"
          strokeWidth={2}
      />
      break;
  }
  return (
    <>
      {value && <text x={Math.abs(x1 - x2)/2} y={Math.abs(y1 - y2)/2 + 3}>{value}</text>}
      {typeElement}
    </>
  )

}
