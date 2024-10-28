import React, { StrictMode} from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import ToolBar, { useCreateEventState } from "./components/ToolBar";
import GraphInterface, { useCreateGraff } from "./components/Graph Interface";
import PanelInfo from "./components/elements/PanelInfo";

function App() {
  const [event, setEvent] = useCreateEventState()
  const [obj, setObj] = useCreateGraff()

  return (
    <>
      <ToolBar event={event} setEvent={setEvent}/>
      <PanelInfo obj={obj} event={event}/>
      <GraphInterface
        event={event}
        obj={obj}
        setObj={setObj}
      />
      
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StrictMode>
  <App/>
</StrictMode>);
