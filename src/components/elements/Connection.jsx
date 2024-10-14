import React, { useContext, useEffect, useState } from 'react'

export const ConnectObject = {
  text: null,
  mass: [],
  connects: []
}

export function MarkerConections({id = "arrow" ,refX = 15, markerHeight= 10, markerWidth = 10, color = 'black'}) {
  return (
    <defs>
        <marker id={id} markerWidth={markerWidth} markerHeight={markerHeight} refX={refX} refY={markerHeight/ 2} orient="auto">
            <path d="M0,3 L8,5 L0,7" fill={color}/>
        </marker>
    </defs>
  )
}

export default function Connection({value, type = 'line', top1, top2, market, color = 'black'}) {

  const [loopVector, setLoopVector] = useState({})
  
  let typeElement;
  // eslint-disable-next-line default-case
  switch(type) {
    case 'line':
      typeElement = <line x1={top1.x} y1={top1.y} x2={top2.x} y2={top2.y} markerEnd={market && `url(#${market})`} stroke={color} strokeWidth="2" />
      break;
    case 'loop':
      setLoopVector({
        x1: top1.x + Math.random() *1000 -500,
        y1: top1.y + Math.random() *1000 -500,
        x2: top1.x + Math.random() *1000 -500,
        y2: top1.y + Math.random() *1000 -500,
      })
      // eslint-disable-next-line no-unused-vars
      typeElement = <path
          d={`M ${top1.x} ${top1.x} C ${loopVector.x1} ${loopVector.y1} ${loopVector.x2} ${loopVector.y2} ${top1.x} ${top1.y}`}
          stroke={color}
          fill="none"
          strokeWidth={2}
      />
      break;
  }
  return (
    <>
      {value && <text x={Math.abs(top1.x - top2.x)/2} y={Math.abs(top1.y - top2.y)/2 + 3}>{value}</text>}
      {typeElement}
    </>
  )

}
