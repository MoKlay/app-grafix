import React, { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import ToolBar, { useCreateEventState } from "./components/ToolBar";
import GraphInterface, { useCreateGraf } from "./components/Graph Interface";
import PanelInfo from "./components/elements/PanelInfo";
import Matrix from "./components/elements/Matrix";
import { useDepthTraversal } from "./servise/DepthTraversal";
import Eulerian from "./servise/EulerianGraph";

function App() {
  const [event, setEvent] = useCreateEventState()
  const [obj, setObj] = useCreateGraf(event.isVector)
  const [node ,setStart] = useDepthTraversal(obj.adjacencies)
  const eulerian = Eulerian(obj)

  useEffect(() => {
    (eulerian && console.log('Эйлеров граф')) 
    ||
    (!eulerian && console.log('Не эйлеров граф'))
    
  }, [eulerian, obj])
  




  return (
    <>
      <ToolBar event={event} setEvent={setEvent}/>
      <PanelInfo obj={obj} event={event}/>
      <PanelInfo custom pos="right" >
        <Matrix obj={obj}/>
      </PanelInfo>
      <GraphInterface
        event={event}
        obj={obj}
        setObj={setObj}
        setStartTraversal={setStart}
        start={node}
      />
      
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StrictMode>
  <App/>
</StrictMode>);

