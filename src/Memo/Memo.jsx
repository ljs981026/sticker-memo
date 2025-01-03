import React, { useRef } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.scss";
import Draggable from "@ljs981026/draggable";

const Memo = ({item, Delete, Edit, SetPosition, SetWidthHight}) => {
  const handleRef = useRef(null);
  return (
    <Draggable handleRef={handleRef} onMove={(x, y) => console.log(x, y)} x={0} y={0}>
      <div ref={handleRef} className="memo-container" style={{width: `${250}px`, height: `${300}px`}}>
        <div className="menu">
          <DragHandleIcon sx={{cursor: "move", fontSize: "25px"}} />
          <CloseIcon sx={{cursor: "pointer", fontSize: "25px", float: "right"}}/>
        </div>
        <textarea className="memo-text-area" defaultValue={"Enter memo here"} name="txt" placeholder="Enter memo here"></textarea>
      </div>
    </Draggable>
  )
}

export default Memo;