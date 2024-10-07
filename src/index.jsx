import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import ToolBar, { EVENT } from "./components/ToolBar";
import Input from "./components/elements/Input";
import GraphInterface from "./components/Graph Interface";
import { TopObject } from "./components/elements/Top";

function App() {
  const [toolType, setToolType] = useState(EVENT.CURSOR);
  const [createToTap, setCreateToTap] = useState(false);
  const [isVector, setIsVector] = useState(false);
  const [tops, setTops] = useState(TopObject);
  const [connections, setConnections] = useState(null);

  useEffect(() => {
    let prev = tops
    if (prev && prev.object && prev.text === '') {
      Object.keys(prev.object).forEach(value => prev.text += value + ',')
      prev.text.slice(0, -1)
      setTops(prev)
    }
  }, [tops])

  function handleClickCreateTop(e) {
    if (createToTap) {
      const name = prompt("Укажите имя для новой вершины");
      name && setTops(prev => {
        prev.text = ''
        prev.object = {
          [name]:{
            x: e.clientX,
            y: e.clientY,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
          }, ...prev.object
        }
        return prev
      });
    }
  }

  return (
    <>
      <Input
        event={toolType}
        onSubmit={(obj) => {
          toolType === EVENT.ADD_TOP && setTops(obj);
          setToolType(EVENT.CURSOR);
        }}
        onClick={(flag) => setCreateToTap(flag)}
        obj={
          (toolType === EVENT.ADD_TOP && tops) 
          ||
          (toolType === EVENT.ADD_CONNECTION && connections)
        }
        isEdit={createToTap}
      />
      <ToolBar
        event={toolType}
        setEvent={(value) => {
          if (typeof value === 'string' && (value === EVENT.ADD_TOP || value === EVENT.ADD_CONNECTION)) {
            setToolType(value);
            setCreateToTap(true);
          } else if (typeof value === 'boolean') setIsVector(value);
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
