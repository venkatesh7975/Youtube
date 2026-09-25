import React from "react";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  function onIncrease(){
    setCount(count+1);
    console.log(count);
  }
  return (
    <div>
      Counter
      <button onClick={onIncrease}> Increase</button>
      <h1>{count}</h1>
    </div>
  );
}
