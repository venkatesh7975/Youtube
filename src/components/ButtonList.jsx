import React from "react";
import Button from "./Button";
import { useSelector } from "react-redux";

const list = [
  "All",
  "Gaming",
  "Music",
  "React",
  "Tailwind",
  "Web Dev",
  "Movies",
  "Live",
  "Cricket",
  "Podcasts",
  "News",
  "Tech",
  "AI",
  "Shorts",
  "Design",
];

export default function ButtonList() {
  const isDarkMode = useSelector((store) => store.app.isDarkMode);

  return (
    <div
      className={`sticky top-14 z-40 flex items-center space-x-2 py-3 px-4 overflow-x-auto no-scrollbar backdrop-blur-md transition-colors ${
        isDarkMode ? "bg-[#0f0f0f]/90" : "bg-white/90"
      }`}
    >
      {list.map((name, index) => (
        <Button key={index} name={name} />
      ))}
    </div>
  );
}
