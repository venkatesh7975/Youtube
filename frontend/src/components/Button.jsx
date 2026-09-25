import React from "react";
import axios from "axios";
export default function Button() {
  async function onGetResponse() {
    const res = await axios.get("http://localhost:3000/hello");
    console.log(res.data);
  }
  return (
    <div>
      <button onClick={onGetResponse}>CLick</button>
    </div>
  );
}
