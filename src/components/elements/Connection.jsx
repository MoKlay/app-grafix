
import React, { useMemo, useRef, useState } from 'react'
import Top from './Top';


export function useCreateConnections() {
  const [connections, setConnections] = useState(ConnectObject);

  function update(mass) {
    if (Array.isArray(mass)) setConnections({
      text: JSON.stringify([...connections.mass, mass]).slice(1, -1).replaceAll('[', '(').replaceAll(']', ')').replaceAll('"', ''),
      mass: [
        ...connections.mass,
        mass
      ],
      connects: [],
      length: connections.mass.length + 1

    })
    else if (typeof mass === 'function') {
      const masslocal = mass(connections.mass)

      setConnections({
        text: JSON.stringify(masslocal).slice(1, -1).replaceAll('[', '(').replaceAll(']', ')').replaceAll('"', ''),
        mass: masslocal,
        connects: [],
        length: masslocal.length + 1
      })
    }
  }

  return [connections, update]
}



export const ConnectObject = {
  text: "",
  mass: [],
  connects: [],
  length: 0
}

export function MarkerConnections({ id = "arrow", refX = 16, markerHeight = 10, markerWidth = 10, color = 'black' }) {
  return (
    <defs>
      <marker id={id} markerWidth={markerWidth} markerHeight={markerHeight} refX={refX} refY={markerHeight / 2} orient="auto">
        <path d="M0,3 L8,5 L0,7" fill={color} />
      </marker>
    </defs>
  )
}

export default function Connection({ value, type = 'line', top1, top2, market, color = 'black', onClick}) {

  const state = useRef({
    x1: Math.random() * 500 - 250,
    y1: Math.random() * 500 - 250,
    x2: Math.random() * 500 - 250,
    y2: Math.random() * 500 - 250,
  })

  const loopVector = useMemo(() => ({
    x1: top1.x + state.current.x1,
    y1: top1.y + state.current.y1,
    x2: top1.x + state.current.x2,
    y2: top1.y + state.current.y2,
  }), [top1]) 

  const typeElement = useRef(null);
  switch (type) {
    case 'loop':
      typeElement.current = <path
        d={`M ${top1.x} ${top1.y} C ${loopVector.x1} ${loopVector.y1} ${loopVector.x2} ${loopVector.y2} ${top1.x} ${top1.y}`}
        stroke={color}
        fill="none"
        strokeWidth={2}
      />
      break;
    default:
    
      typeElement.current = <line x1={top1.x} y1={top1.y} x2={top2.x} y2={top2.y} markerEnd={market && `url(#${market})`} stroke={color} strokeWidth="2">
        <animateTransform attributeName='transform' type='rotate' from={`0 ${top1.x} ${top1.y}`} to={`360 ${top1.x} ${top1.y}`} dur="1s" />

      </line>
      break;
  }
  return (
    <g onClick={onClick}>
      {
        type === 'loop' && <>
          <Top x={loopVector.x1} y={loopVector.y1} radius={5}/> 
          <Top x={loopVector.x2} y={loopVector.y2} radius={5}/> 
        </>
      }
      {value && <text 
      x={Math.abs(top1.x - top2.x) / 2 + Math.min(top1.x, top2.x)  -15} 
      y={Math.abs(top1.y - top2.y) / 2 + Math.min(top1.y, top2.y)  -15}
      textAnchor="middle" dominantBaseline="middle"
      >
        {value}
        </text>}
      {typeElement.current}
    </g>
  )

}
