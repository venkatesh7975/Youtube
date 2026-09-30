import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

export default function MainContainer() {
  return (
    <div className="flex-1 overflow-x-hidden min-w-0">
      <ButtonList />
      <VideoContainer />
    </div>
  );
}
