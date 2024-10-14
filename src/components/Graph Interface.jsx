import React, { useEffect, useState } from "react";
import Connection, { MarkerConections } from "./elements/Connection";
import Top from "./elements/Top";
import { EVENT } from "./ToolBar";

export default function GraphInterface({
  event,
  tops,
  connections,
  onMouseMove,
  onClick,
  onClickTop,
  getConnect
}) {
  const [isDragging, setIsDragging] = useState(null);
  const [connect, setConnect] = useState([])

  useEffect(() => {
    console.log(connect);
    if (connect.length == 2) {
      getConnect && getConnect(connect)
      setConnect([])
    }
  }, [connect])

  return (
    <svg
      className="graph-interface"
      onMouseUp={() => {
        switch (event) {
          case EVENT.CURSOR: setIsDragging(null); break;
          default: break;
        }                        
      }}
      onMouseMove={(e) => {
        switch (event) {
          case EVENT.CURSOR: isDragging && onMouseMove(e, isDragging); break;
          default: break;
        }
      }}
      onClick={onClick}
    >
      <MarkerConections id="connect" refX={5}/>
      <MarkerConections />
      {tops &&
        Object.entries(tops.object).map(([value, top]) => {
          if (top) return (
            <Top
              key={value}
              x={top.x}
              y={top.y}
              value={value}
              radius={12}
              onMouseDown={e => {
                switch (event) {
                  case EVENT.CURSOR: setIsDragging(value); break;
                  default: break
                }
              }}
              onClick={() => {
                switch (event) {
                  case EVENT.DELETE_TOP: onClickTop(value); break;
                  case EVENT.ADD_CONNECTION: setConnect(prev => ([...prev, parseInt(value)]))
                  default: break;
                }
              }}
              onMouseUp={e => {
                switch (event) {
                  default: break;
                }
              }}
            />
          );
          return null
        })}
        {connections && connections.mass.map((el, i) => (
          <Connection
            key={`connect-${i}`} 
            type={el[0] !== el[1] ? 'line' : 'loop'}
            top1={tops.object[el[0]]}
            top2={tops.object[el[1]]} 
          />
        ))}
    </svg>
  );
}
