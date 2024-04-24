import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import "./styles.css";

const arr = []; // 创建空数组用来存放state
let cursor = 0;
function useState(initialValue) {
  // 按照索引取，如果取不到则赋初始值
  arr[cursor] = arr[cursor] || initialValue;
  // 当时（由于下面函数有引用，因此该变量不会被回收）的索引
  // !!! 区分 cursor 与 currentCursor
  // cursor 是递增的，而currentCursor则与arr的state一一对应
  const currentCursor = cursor;
  console.log("get", arr, currentCursor, cursor);
  function setState(newState) {
    arr[currentCursor] = newState;
    console.log("set", arr, currentCursor, cursor);
    cursor = 0;
    render(); // 模拟 reRender，这一行不需要关心
  }
  return [arr[cursor++], setState];
}

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("bob");
  const [age, setAge] = useState(18);

  return (
    <div>
      <div>{count}</div>
      <Button
        onClick={() => {
          setCount(count + 1);
          setName(name + count);
          setAge(age + 1);
        }}
      >
        点击
      </Button>

      <div>名字：{name}</div>
      <div>年龄：{age}</div>
    </div>
  );
}

const rootElement = document.getElementById("root");

function render() {
  ReactDOM.render(<App />, rootElement);
}
render();
