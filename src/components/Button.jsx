import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../utils/videoSlice";

export default function Button({ name }) {
  const dispatch = useDispatch();
  const activeCategory = useSelector((store) => store.video.activeCategory);
  const isDarkMode = useSelector((store) => store.app.isDarkMode);

  const isActive = activeCategory === name;

  const handleClick = () => {
    dispatch(setActiveCategory(name));
  };

  return (
    <button
      onClick={handleClick}
      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 ${
        isActive
          ? isDarkMode
            ? "bg-white text-zinc-900 shadow-sm"
            : "bg-zinc-900 text-white shadow-sm"
          : isDarkMode
          ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
      }`}
    >
      {name}
    </button>
  );
}
