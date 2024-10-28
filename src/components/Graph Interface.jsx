import React, { useEffect, useState } from "react";
import Connection, { MarkerConections, useCreateConnections } from "./elements/Connection";
import Top, { useCreateTops } from "./elements/Top";
import { EVENT } from "./ToolBar";


export function useCreateGraff() {
  const [tops, setTops] = useCreateTops()
  const [connections, setConnections] = useCreateConnections()

  function update(type, value) {
    switch (type) {
      case tops: setTops(value); break
      case connections: setConnections(value); break
      default: break;
    }
  }

  return [{ tops, connections }, update]
}

function useTargetConnections(obj, setObj) {
  const [connect, setconnect] = useState([])

  useEffect(() => {
    if (connect.length === 2) {
      setObj(obj, connect)
      setconnect([])
    }
  }, [connect, obj, setObj])

  function update(value) {
    setconnect(prev => ([
      ...prev,
      value
    ]))
  }

  return [connect, update]
}

export default function GraphInterface({
  event,
  obj,
  setObj
}) {
  const [DragTop, setDragTop] = useState(null)

  const [connect, setconnect] = useTargetConnections(obj.connections, setObj)

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
        // switch (event.toolType) {
        //   case EVENT.CURSOR: setDragTop(null); break
        //   default: break;
        // }
      }}
    >
      <MarkerConections />
      {obj.connections && obj.connections.mass.map((el, i) => (
          <Connection
            key={`connect-${i}`} 
            type={el[0] === el[1] && 'loop'}
            top1={obj.tops.tops[el[0]]}
            top2={obj.tops.tops[el[1]]} 
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
              bgColor={(DragTop === value || connect.includes(value)) && 'green'}
              onMouseDown={() => {
                switch (event.toolType) {
                  case EVENT.CURSOR: setDragTop(value); break
                  default: break;
                }
              }}
              
              onClick={() => {
                switch (event.toolType) {
                  case EVENT.ADD_CONNECTION: setconnect(value); break
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
