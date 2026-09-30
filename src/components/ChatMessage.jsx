import React from "react";
import { useSelector } from "react-redux";

export default function ChatMessage({ name, message, avatar }) {
  const isDarkMode = useSelector((store) => store.app.isDarkMode);

  return (
    <div
      className={`flex items-start space-x-2.5 px-3 py-1.5 hover:bg-zinc-500/10 transition-colors text-xs ${
        isDarkMode ? "text-zinc-200" : "text-zinc-800"
      }`}
    >
      <img
        src={
          avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
            name
          )}`
        }
        alt={name}
        className="w-6 h-6 rounded-full shrink-0 mt-0.5"
      />
      <div className="flex flex-wrap items-baseline gap-x-1.5">
        <span className="font-semibold text-zinc-400 dark:text-zinc-400">
          {name}
        </span>
        <span className="break-all">{message}</span>
      </div>
    </div>
  );
}
