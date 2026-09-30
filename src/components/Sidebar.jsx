import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setActiveCategory } from "../utils/videoSlice";
import {
  Home,
  Compass,
  Film,
  Library,
  History,
  Clock,
  ThumbsUp,
  Flame,
  Music2,
  Gamepad2,
  Trophy,
  Newspaper,
  Radio,
  Tv,
} from "lucide-react";

export default function SideBar() {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const isDarkMode = useSelector((store) => store.app.isDarkMode);
  const activeCategory = useSelector((store) => store.video.activeCategory);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleCategoryClick = (categoryName) => {
    dispatch(setActiveCategory(categoryName));
  };

  // Mini sidebar when menu is closed
  if (!isMenuOpen) {
    return (
      <aside
        className={`w-18 flex flex-col items-center py-4 space-y-6 text-xs sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto shrink-0 select-none ${
          isDarkMode ? "bg-[#0f0f0f] text-zinc-300" : "bg-white text-zinc-700"
        }`}
      >
        <Link
          to="/"
          onClick={() => handleCategoryClick("All")}
          className={`flex flex-col items-center space-y-1 p-2.5 rounded-xl transition-colors ${
            location.pathname === "/" && activeCategory === "All"
              ? isDarkMode
                ? "bg-zinc-800 text-white font-semibold"
                : "bg-zinc-100 text-zinc-900 font-semibold"
              : isDarkMode
              ? "hover:bg-zinc-800/60"
              : "hover:bg-zinc-100"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </Link>

        <Link
          to="/shorts"
          className={`flex flex-col items-center space-y-1 p-2.5 rounded-xl transition-colors ${
            isDarkMode ? "hover:bg-zinc-800/60" : "hover:bg-zinc-100"
          }`}
        >
          <Film className="w-5 h-5 text-red-500" />
          <span className="text-[10px]">Shorts</span>
        </Link>

        <button
          onClick={() => handleCategoryClick("Music")}
          className={`flex flex-col items-center space-y-1 p-2.5 rounded-xl transition-colors ${
            isDarkMode ? "hover:bg-zinc-800/60" : "hover:bg-zinc-100"
          }`}
        >
          <Library className="w-5 h-5" />
          <span className="text-[10px]">Subscriptions</span>
        </button>

        <button
          className={`flex flex-col items-center space-y-1 p-2.5 rounded-xl transition-colors ${
            isDarkMode ? "hover:bg-zinc-800/60" : "hover:bg-zinc-100"
          }`}
        >
          <History className="w-5 h-5" />
          <span className="text-[10px]">You</span>
        </button>
      </aside>
    );
  }

  // Expanded Sidebar
  return (
    <aside
      className={`w-60 p-3 flex flex-col space-y-4 text-sm sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto shrink-0 select-none ${
        isDarkMode ? "bg-[#0f0f0f] text-zinc-200" : "bg-white text-zinc-800"
      }`}
    >
      {/* Main Section */}
      <div className="space-y-1 border-b pb-3 border-zinc-200 dark:border-zinc-800">
        <Link
          to="/"
          onClick={() => handleCategoryClick("All")}
          className={`flex items-center space-x-4 px-3 py-2.5 rounded-xl font-medium transition-colors ${
            location.pathname === "/" && activeCategory === "All"
              ? isDarkMode
                ? "bg-zinc-800 text-white font-semibold"
                : "bg-zinc-200/80 text-zinc-900 font-semibold"
              : isDarkMode
              ? "hover:bg-zinc-800/60"
              : "hover:bg-zinc-100"
          }`}
        >
          <Home className="w-5 h-5 text-red-500" />
          <span>Home</span>
        </Link>

        <Link
          to="/shorts"
          className={`flex items-center space-x-4 px-3 py-2.5 rounded-xl font-medium transition-colors ${
            isDarkMode ? "hover:bg-zinc-800/60" : "hover:bg-zinc-100"
          }`}
        >
          <Film className="w-5 h-5 text-amber-500" />
          <span>Shorts</span>
        </Link>

        <button
          onClick={() => handleCategoryClick("Subscriptions")}
          className={`w-full flex items-center space-x-4 px-3 py-2.5 rounded-xl font-medium transition-colors ${
            isDarkMode ? "hover:bg-zinc-800/60" : "hover:bg-zinc-100"
          }`}
        >
          <Library className="w-5 h-5 text-blue-500" />
          <span>Subscriptions</span>
        </button>
      </div>

      {/* Library Section */}
      <div className="space-y-1 border-b pb-3 border-zinc-200 dark:border-zinc-800">
        <div className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
          You
        </div>
        <button
          className={`w-full flex items-center space-x-4 px-3 py-2 rounded-xl transition-colors ${
            isDarkMode ? "hover:bg-zinc-800/60" : "hover:bg-zinc-100"
          }`}
        >
          <History className="w-5 h-5" />
          <span>History</span>
        </button>
        <button
          className={`w-full flex items-center space-x-4 px-3 py-2 rounded-xl transition-colors ${
            isDarkMode ? "hover:bg-zinc-800/60" : "hover:bg-zinc-100"
          }`}
        >
          <Clock className="w-5 h-5" />
          <span>Watch Later</span>
        </button>
        <button
          className={`w-full flex items-center space-x-4 px-3 py-2 rounded-xl transition-colors ${
            isDarkMode ? "hover:bg-zinc-800/60" : "hover:bg-zinc-100"
          }`}
        >
          <ThumbsUp className="w-5 h-5" />
          <span>Liked Videos</span>
        </button>
      </div>

      {/* Explore Section */}
      <div className="space-y-1 border-b pb-3 border-zinc-200 dark:border-zinc-800">
        <div className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
          Explore
        </div>
        {[
          { label: "Trending", icon: Flame, color: "text-orange-500" },
          { label: "Music", icon: Music2, color: "text-emerald-500" },
          { label: "Gaming", icon: Gamepad2, color: "text-purple-500" },
          { label: "News", icon: Newspaper, color: "text-cyan-500" },
          { label: "Sports", icon: Trophy, color: "text-yellow-500" },
          { label: "Live", icon: Radio, color: "text-red-500" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => handleCategoryClick(item.label)}
            className={`w-full flex items-center space-x-4 px-3 py-2 rounded-xl font-medium transition-colors ${
              activeCategory === item.label
                ? isDarkMode
                  ? "bg-zinc-800 text-white font-semibold"
                  : "bg-zinc-200/80 text-zinc-900 font-semibold"
                : isDarkMode
                ? "hover:bg-zinc-800/60"
                : "hover:bg-zinc-100"
            }`}
          >
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Subscriptions Channels */}
      <div className="space-y-1">
        <div className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
          Subscriptions
        </div>
        {[
          { name: "Fireship", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fireship" },
          { name: "Code With Harry", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harry" },
          { name: "Traversy Media", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Brad" },
          { name: "Web Dev Simplified", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kyle" },
        ].map((sub) => (
          <div
            key={sub.name}
            className={`flex items-center space-x-3 px-3 py-2 rounded-xl cursor-pointer transition-colors ${
              isDarkMode ? "hover:bg-zinc-800/60" : "hover:bg-zinc-100"
            }`}
          >
            <img src={sub.avatar} alt={sub.name} className="w-6 h-6 rounded-full" />
            <span className="truncate">{sub.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
