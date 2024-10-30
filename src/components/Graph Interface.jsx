/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { useKeyPress } from 'react-use'
import Connection, { MarkerConnections, useCreateConnections } from "./elements/Connection";
import Top, { useCreateTops } from "./elements/Top";
import { EVENT } from "./ToolBar";
import { useGenerateMatrix } from "./elements/Matrix";


export function useCreateGraf(event) {
  const [tops, setTops] = useCreateTops()
  const [connections, setConnections] = useCreateConnections()
  const [adjacencies, incidents] = useGenerateMatrix(
    useMemo(() => ({tops, connections}), [connections, tops]),
    useMemo(() => (event), [event])
  )

  

  function update(type, value) {
    switch (type) {
      case tops: setTops(value); break
      case connections: setConnections(value); break
      default: break;
    }
  }

  return [{ tops, connections , adjacencies, incidents}, update]
}

function useTargetConnections(obj, setObj) {
  const [connect, setConnect] = useState([])
  const [shiftTarget, setTarget] = useKeyPress('Shift')
  const [escTarget, setEscTarget] = useKeyPress('Escape')
  useEffect(() => {
    if (connect.length === 2) {
      setObj(obj, connect)
      if (shiftTarget) {setConnect([connect[1]])}
      else setConnect([])
    } 
  }, [connect, obj, setObj, shiftTarget])

  useEffect(() => {
    escTarget && setConnect([])
  }, [escTarget])

  function update(value) {
    if (value) {
      setConnect(prev => ([
        ...prev,
        value
      ]))
    } else {
      setConnect([])
    }
  }

  return [connect, update]
}

export default function GraphInterface({
  event,
  obj,
  setObj
}) {
  const [DragTop, setDragTop] = useState(null)

  const [connect, setConnect] = useTargetConnections(obj.connections, setObj)

  useEffect(() => {
    if (event.toolType !== EVENT.ADD_CONNECTION) {
      setConnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.toolType])

  function onCreateSvgTop(e) {
    if (Object.keys(obj.tops.tops).length !== 0) {

      const num = parseInt(Object.keys(obj.tops.tops).pop())
      setObj(obj.tops, {
        ...obj.tops.tops,
        [num + 1]: {
          x: e.clientX,
          y: e.clientY,
          color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        }
      })
      setDragTop(num+1)

    } else {
      setObj(obj.tops, {
        "1": {
          x: e.clientX,
          y: e.clientY,
          color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        }
      })
      setDragTop(1)
    }

  }

  function onMouseDragTop(e) {
    DragTop && setObj(obj.tops, {
      ...obj.tops.tops,
      [DragTop]: {
        ...obj.tops.tops[DragTop],
        x: e.clientX,
        y: e.clientY
      }
    })
  }


  function onDeleteTop(value) {
    const tops = obj.tops.tops
    delete tops[value]
    const connections = obj.connections.mass.filter(el => el[0] !== value && el[1] !== value)
    setObj(obj.connections, prev => {return connections})
    setObj(obj.tops, tops)

  }

  return (
    <svg
      className="graph-interface"
      onMouseDown={(e) => {
        switch (event.toolType) {
          case EVENT.ADD_TOP: onCreateSvgTop(e); break
          default: break;
        }
      }}
      onMouseMove={(e) => {
        onMouseDragTop(e)
      }}
      onMouseUp={() => {
        setDragTop(null)
      }}
    >
      <MarkerConnections refX={15}/>
      {obj.connections && obj.connections.mass.map((el, i) => (
          <Connection
            key={`connect-${i}`} 
            type={el[0] === el[1] && 'loop'}
            top1={obj.tops.tops[el[0]]}
            top2={obj.tops.tops[el[1]]} 
            value={'e' + (i + 1)}
            market={event.isVector ? 'arrow' : undefined}
          />
        ))}
      {obj.tops &&
        Object.entries(obj.tops.tops).map(([value, top]) => {
          if (top) return (
            <Top
              key={value}
              x={top.x}
              y={top.y}
              value={value}
              radius={12}
              bgColor={(DragTop === value || connect.includes(value)) ? 'green' : 'black'}
              onMouseDown={() => {
                switch (event.toolType) {
                  case EVENT.CURSOR: setDragTop(value); break
                  default: break;
                }
              }}
              
              
              onClick={() => {
                switch (event.toolType) {
                  case EVENT.ADD_CONNECTION: setConnect(value); break
                  case EVENT.DELETE_TOP: onDeleteTop(value); break
                  default: break;
                }
              }}
            />
          );
          return null
        })}
      
    </svg>
  );
}
