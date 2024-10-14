import React, { useEffect, useState , StrictMode} from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import ToolBar, { EVENT } from "./components/ToolBar";
// import Input from "./components/elements/Input";
import GraphInterface from "./components/Graph Interface";
import { TopObject } from "./components/elements/Top";
import PanelInfo from "./components/elements/PanelInfo";
import { ConnectObject } from "./components/elements/Connection";
import $ from 'jquery'

function App() {
  const [toolType, setToolType] = useState(EVENT.CURSOR);
  const [isVector, setIsVector] = useState(false);
  const [tops, setTops] = useState(TopObject);
  const [connections, setConnections] = useState(ConnectObject);

  useEffect(() => {
    tops.text === '' && setTops(prev => {
      let text = ''
      Object.keys(prev.object).forEach(key => {
        prev.object[key] && (text += key + ',')
      })
      return {
        text: text.slice(0, -1),
        object: prev.object
      };
    });
  }, [tops.object])

  useEffect(() => {
    connections.text === '' && setConnections(prev => {
      let text = JSON.stringify(prev.mass).replace(/\[/g, '(').replace(/\]/g, ')').slice(1, -1)
      return {
        ...prev,
        text
      }
    })
  }, [connections])

  function handleClickCreateTop(e) {
    toolType === EVENT.ADD_TOP && setTops(prev => ({
      text: '',
      object: {
        ...prev.object,
        [Object.keys(prev.object).length +1]: {
          x: e.clientX,
          y: e.clientY,
          color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        },
      }
    }))
  }

  function handleClickDeleteTop(value) {
    toolType === EVENT.DELETE_TOP && setTops(prev => ({
      text: '',
      object: {
        ...prev.object,
        [value]: null
      }
    }))

  }



  return (
    <>
      <ToolBar
        event={toolType}
        setEvent={(value) => {
          if (typeof value === 'string' && (Object.values(EVENT).includes(value))) {
            setToolType(value);
          } else if (typeof value === 'boolean') setIsVector(value);
        }}
      />
      <PanelInfo tops={tops} connections={connections}/>
      <GraphInterface
        event={toolType}
        tops={tops}
        connections={connections}
        onMouseMove={(e, top) => {
          toolType === EVENT.CURSOR && setTops((prevtops) => ({ ...prevtops, object:  { 
            ...tops.object, [top]: {
              x: e.clientX,
              y: e.clientY,
              color: prevtops.object[top].color,
            } }}));
          
        }}
        onClick={handleClickCreateTop}
        onClickTop={handleClickDeleteTop}
        getConnect={connect => setConnections(prev => ({
          text: '',
          mass: [...prev.mass, connect],
          connects: []
        }))}
      />
      
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StrictMode>
  <App/>
</StrictMode>);
