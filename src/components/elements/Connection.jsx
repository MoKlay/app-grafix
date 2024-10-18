import React, { useEffect, useRef, useState } from 'react'

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
function useDoubleClick(event) {
  const count = useRef(0);
  function handleDoubleClick() {
    count.current++;
    setTimeout(() => count.current = 0, 500);
    if (count.current === 2) {
        event()
        count.current = 0;
    }
  }
  return handleDoubleClick
}

export default function Connection({value, type = 'line', top1, top2, market, color = 'black'}) {

  const [loopVector, setLoopVector] = useState({
    x1: Math.random() *1000 -500,
    y1: Math.random() *1000 -500,
    x2: Math.random() *1000 -500,
    y2: Math.random() *1000 -500,
  })
  const [editloopVector, setEditloopVector] = useState(false)
  
  const typeElement = useRef(null);
  const doubleClick = useDoubleClick(() => setEditloopVector(!editloopVector))

  useEffect(() => {
    switch(type) {
      case 'line':
        typeElement.current = <line x1={top1.x} y1={top1.y} x2={top2.x} y2={top2.y} markerEnd={market && `url(#${market})`} stroke={color} strokeWidth="2"/>
        break;
      case 'loop':
        typeElement.current = <path
        onClick={e => doubleClick()}
            d={`M ${top1.x} ${top1.y} C ${top1.x + loopVector.x1} ${top1.y+loopVector.y1} ${top1.x+loopVector.x2} ${top1.y+loopVector.y2} ${top1.x} ${top1.y}`}
            stroke={color}
            fill="none"
            strokeWidth={2}
            style={{
              animation: 'path 1s ease-in-out'
            }}
        >
          <animate attributeName='d' d/>
        </path>
        break;
        default: break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, top1, top2])
 
  return (
    <>
      {value && <text x={Math.abs(top1.x - top2.x)/2} y={Math.abs(top1.y - top2.y)/2 + 3}>{value}</text>}
      {typeElement.current}
    </>
  )

}
