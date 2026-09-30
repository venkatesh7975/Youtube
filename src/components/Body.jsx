import React from "react";
import SideBar from "./SideBar";
import MainContainer from "./MainContainer";

export default function Body() {
  return (
    <div className="flex">
      <SideBar />
      <MainContainer />
    </div>
  );
}
