/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useKeyPress } from 'react-use'
import Connection, { MarkerConnections, useCreateConnections } from "./elements/Connection";
import Top, { useCreateTops } from "./elements/Top";
import { EVENT } from "./ToolBar";
import { useGenerateMatrix } from "./elements/Matrix";
import ContextMenu from "./elements/ContextMenu";


export function useCreateGraf(event) {
  const [tops, setTops] = useCreateTops()
  const [connections, setConnections] = useCreateConnections()
  const matrix = useGenerateMatrix({ tops, connections }, event)


  function update(type, value) {
    switch (type) {
      case tops: setTops(value); break
      case connections: setConnections(value); break
      default: break;
    }
  }

  return [{ tops, connections, ...matrix }, update]
}














function useTargetConnections(obj, setObj) {
  const [connect, setConnect] = useState([])
  const [shiftTarget, setTarget] = useKeyPress('Shift')
  const [escTarget, setEscTarget] = useKeyPress('Escape')
  useEffect(() => {
    if (connect.length === 2) {
      setObj(obj, connect)
      if (shiftTarget) { setConnect([connect[1]]) }
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
  setObj,
  setStartTraversal,
  way = [],
  start
}) {
  const [DragTop, setDragTop] = useState(null)
  const [connect, setConnect] = useTargetConnections(obj.connections, setObj)
  const [context, setContext] = useState(null)
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0
  })
  const [connectionsOnTop, setConnectionsOnTop] = useState(null)

  useEffect(() => {
    if (context) {
      const connections = obj.connections.mass.map((el, i) => (['e' + (i + 1), el])).filter(([key ,el]) => el.includes(context.value))
      if (connections.length !== 0)
        setConnectionsOnTop(connections)
    } else {
      setConnectionsOnTop(null)
    }
  }, [context, obj.connections.mass])








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
      setDragTop(num + 1)

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

    DragTop ? setObj(obj.tops, {
      ...obj.tops.tops,
      [DragTop]: {
        ...obj.tops.tops[DragTop],
        x: e.clientX,
        y: e.clientY
      }
    }) :
      setCursor({
        x: e.clientX,
        y: e.clientY

      })
  }


  function onDeleteTop(value) {
    const tops = obj.tops.tops
    delete tops[value]
    const connections = obj.connections.mass.filter(el => el[0] !== value && el[1] !== value)
    setObj(obj.connections, prev => (connections))
    setObj(obj.tops, tops)

  }

  function onDeleteConnection(value) {
    const connections = obj.connections.mass.filter(el => el[0] !== value[0] || el[1] !== value[1])
    setObj(obj.connections, prev => (connections))
  }














  return (
    <>
      <svg
        className="graph-interface"
        onMouseDown={(e) => {
          setContext(null)
          switch (event.toolType) {
            case EVENT.ADD_TOP: e.button === 0 && onCreateSvgTop(e); break
            default: break;
          }
        }}
        onMouseMove={
          onMouseDragTop
        }
        onMouseUp={() => {
          setDragTop(null)
        }}
        onClick={() => {
          switch (event.toolType) {
            case EVENT.ADD_CONNECTION: setConnect(null); break
            case EVENT.CURSOR: setContext(null); break
            default: break;
          }
        }}
      >
        {start && <Top radius={8} x={obj.tops.tops[start].x} y={obj.tops.tops[start].y} bgColor="green" className='travel'/>}



        <MarkerConnections refX={15} />
        <MarkerConnections refX={5} id="connect" />





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




        {connect.length !== 0 && <Connection
          top1={obj.tops.tops[connect[0]]}
          top2={cursor}
          market={'connect'}
        />}




        {obj.tops &&
          Object.entries(obj.tops.tops).map(([value, top], i) => {
            if (top) return (
              <Top
                key={value}
                x={top.x}
                y={top.y}
                value={value}
                radius={12}
                bgColor={(DragTop === value || connect.includes(value)) || way.includes(value) ? 'green' : 'black'}
                onMouseDown={(e) => {
                  switch (event.toolType) {
                    case EVENT.CURSOR: e.button === 0 && !start && setDragTop(value); break
                    case EVENT.ADD_TOP: e.button === 2 && setDragTop(value); break
                    default: break;
                  }
                }}

                onContextMenu={(e) => {
                  event.toolType === EVENT.CURSOR && setContext({
                    x: e.clientX,
                    y: e.clientY,
                    value,
                    i
                  })
                }}
                onClick={() => {
                  connect.length !== 0 && setConnect(value)
                  switch (event.toolType) {
                    case EVENT.DELETE_TOP: onDeleteTop(value); break
                    default: break;
                  }
                }}
              />
            );
            return null
          })}

      </svg>






      {context && <ContextMenu x={context.x} y={context.y} value={context.value} items={[
        {
          label: 'Соединить',
          onClick: () => {
            setConnect(context.value)
            setContext(null)
          }
        },
        {
          label: 'Обойти граф',
          onClick: () => { setStartTraversal(context.value); setContext(null) }
        },
        {
          label: 'Удалить',
          onClick: () => { onDeleteTop(context.value); setContext(null) }
        },
        (connectionsOnTop && {
          label: 'Удалить связь',
          items: connectionsOnTop.map(([key, el], i) => ({
            label: key,
            onClick: () => {
              onDeleteConnection(el)
              setContext(null)
            }
          }))
        })
      ]} 
      obj={{
        degree: Object.values(obj.adjacencies[context.value]).filter(el => el === 1).length,
      }}/>}
    </>
  );
}
