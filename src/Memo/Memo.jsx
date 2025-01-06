import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.scss";
import Draggable from "@ljs981026/draggable";
import { debounce } from "underscore";
import { observer } from "mobx-react";

const Memo = ({item, Delete, Edit, SetPosition, SetWidthHeight}) => {
  const handleRef = useRef(null);
  const memoContainer = useRef(null); 
  const onChangeMemo = useMemo(() => debounce(e => Edit(item.id, e.target.value), 500), [item.id, Edit]);
  const onChangePosition = useCallback((x, y) => SetPosition(item.id, x, y), [item.id, SetPosition]);
  const onChangeSize = useMemo(() => debounce((entry) => {
    const {width, height} = entry[0].contentRect;
    SetWidthHeight(item.id, width, height);
  }, 100), [item.id, SetWidthHeight]);
  const onCLickDelete = useCallback(() => Delete(item.id), [item.id, Delete])

  useEffect(() => {
    return () => {
      onChangeMemo.cancel()
      onChangeSize.cancel()
    }
  },[onChangeMemo, onChangeSize])

  useLayoutEffect(() => {
    let ro = new ResizeObserver(onChangeSize);
    ro.observe(memoContainer.current);
    return () => {
      ro.disconnect();
      ro = null;
    }
  })
  
  return (
    <Draggable handleRef={handleRef} onMove={onChangePosition} x={0} y={0}>
      <div ref={memoContainer} className="memo-container" style={{width: `${250}px`, height: `${300}px`}}>
        <div className="menu">
          <DragHandleIcon ref={handleRef} sx={{cursor: "move", fontSize: "25px"}} />
          <CloseIcon sx={{cursor: "pointer", fontSize: "25px", float: "right"}} onClick={onCLickDelete}/>
        </div>
        <textarea           
          className="memo-text-area" 
          defaultValue={item.content} 
          name="txt" 
          placeholder="Enter memo here"
          onChange={onChangeMemo}
        >          
        </textarea>
      </div>
    </Draggable>
  )
}

export default observer(Memo);