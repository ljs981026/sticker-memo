import { action, makeObservable, observable } from "mobx";
import {v1 as uuid_v1} from "uuid";

export class MemoModel {
  id = uuid_v1();
  content = "";
  x = 0;
  y = 0;
  width = 250;
  height = 300;
  constructor () {
    makeObservable(this,{
      content: observable,
      x: observable,
      y: observable,
      width: observable,
      height: observable
    })
  }
}

export default class MemoStore {
  // id = "memoStore"
  memos = [];
  constructor() {
    makeObservable(this, {
      memos: observable,
      addMemo: action,
      editMemo: action,
      setWidthHeight: action,
      setPosition: action,
      removeMemo: action
    })
  }
  addMemo() {
    this.memos.push(new MemoModel())
  }
  editMemo(id, content) {
    this.memos[this.getMemoIndex(id)].content = content;
  }
  removeMemo(id) {    
    this.memos.splice(this.getMemoIndex(id), 1);
  }
  getMemoIndex(id) {
    return this.memos.findIndex(memo => memo.id === id);
  }
  setWidthHeight(id, width, height) {
    const idx = this.getMemoIndex(id);
    this.memos[idx].width = width;
    this.memos[idx].height = height;
  }
  setPosition(id, x, y) {
    const idx = this.getMemoIndex(id);
    this.memos[idx].x = x;
    this.memos[idx].y = y;
  }
}