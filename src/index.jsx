import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import ToolBar, { EVENT } from "./components/ToolBar";
import Input from "./elements/Input";
import GraphInterface from "./components/Graph Interface";

function App() {
  const [toolType, setToolType] = useState(EVENT.CURSOR);
  const [createToTap, setCreateToTap] = useState(false);
  const [isVector, setIsVector] = useState(false);
  const [tops, setTops] = useState(null);
  const [connections, setConnections] = useState(null);

  function handleClickCreateTop(e) {
    if (createToTap) {
      const name = prompt("Укажите имя для новой вершины");
      if (name && !tops) {
        setTops({
          object: {
            [name]: {
              x: e.clientX,
              y: e.clientY,
              color: '#' + Math.floor(Math.random()*16777215).toString(16),
            },
          },
          text: name,
        });
      } else if (name && tops) {
        setTops((prevtops) => {
          const object ={
            
            [name]: {
              x: e.clientX,
              y: e.clientY,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
            },...prevtops.object,
          }
          let text = ''
          Object.keys(object).forEach((key) => {
            text += key + ",";
          })
          
          text = text.slice(0, -1);
          
          return ({
          text,
          object
        })});
      }
    }
  }

  return (
    <>
      <Input
        event={toolType}
        onSubmit={(obj) => {
          if (toolType === EVENT.ADD_TOP) {
            setTops(obj);
          }
          setToolType(EVENT.CURSOR);
        }}
        onClick={(flag) => setCreateToTap(flag)}
        val={
          (toolType === EVENT.ADD_TOP && tops && tops.text) ||
          (toolType === EVENT.ADD_CONNECTION &&
            connections &&
            connections.text) ||
          ""
        }
        isEdit={createToTap}
      />
      <ToolBar
        event={toolType}
        setEvent={(value, isEvent) => {
          if (isEvent) {
            setToolType(value);
            value === EVENT.ADD_TOP && setCreateToTap(true);
          } else setIsVector(value);
        }}
      />
      <GraphInterface
        tops={tops && tops.object}
        onMouseMove={(e, top) => {
          const updatedTops = { ...tops.object };
          updatedTops[top] = {
            x: e.clientX,
            y: e.clientY,
          };
          setTops((prevtops) => ({ ...prevtops, object: updatedTops }));
        }}
        onClick={handleClickCreateTop}
      />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
