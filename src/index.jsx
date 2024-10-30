import React, { StrictMode, useMemo} from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import ToolBar, { useCreateEventState } from "./components/ToolBar";
import GraphInterface, { useCreateGraf } from "./components/Graph Interface";
import PanelInfo from "./components/elements/PanelInfo";
import Matrix from "./components/elements/Matrix";

function App() {
  const [event, setEvent] = useCreateEventState()
  const [obj, setObj] = useCreateGraf(
    useMemo(() => event, [event])
  )

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
      />
      
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StrictMode>
  <App/>
</StrictMode>);

