import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, toggleDarkMode } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  Menu,
  Search,
  Mic,
  Bell,
  Video,
  Sun,
  Moon,
  User,
  Tv,
} from "lucide-react";

export default function Head() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchCache = useSelector((store) => store.search);
  const isDarkMode = useSelector((store) => store.app.isDarkMode);

  /**
   * Debouncing search API requests
   */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try {
      // YouTube completion endpoint via cors proxy or direct query
      const res = await fetch(
        `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      if (res.ok) {
        const data = await res.json();
        const results = data[1] || [];
        setSuggestions(results);
        dispatch(cacheResults({ [searchQuery]: results }));
      } else {
        fallbackSuggestions();
      }
    } catch (err) {
      fallbackSuggestions();
    }
  };

  const fallbackSuggestions = () => {
    const mockList = [
      searchQuery,
      `${searchQuery} tutorial`,
      `${searchQuery} course 2025`,
      `${searchQuery} vs python`,
      `${searchQuery} full project`,
      `${searchQuery} beginner guide`,
    ];
    setSuggestions(mockList);
    dispatch(cacheResults({ [searchQuery]: mockList }));
  };

  const handleSearchSubmit = (queryToSearch) => {
    const targetQuery = queryToSearch || searchQuery;
    if (!targetQuery.trim()) return;
    setShowSuggestions(false);
    navigate(`/results?search_query=${encodeURIComponent(targetQuery.trim())}`);
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-4 py-2.5 border-b shadow-xs transition-colors duration-200 ${
        isDarkMode
          ? "bg-[#0f0f0f] text-white border-zinc-800"
          : "bg-white text-zinc-900 border-zinc-200"
      }`}
    >
      {/* Left Section: Menu Toggle & YouTube Logo */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleMenuHandler}
          className={`p-2 rounded-full transition-colors ${
            isDarkMode ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"
          }`}
          title="Toggle Navigation"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Link to="/" className="flex items-center space-x-1.5 focus:outline-none">
          <div className="bg-red-600 text-white p-1 rounded-lg flex items-center justify-center shadow-md">
            <Tv className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tighter flex items-center">
            YouTube<span className="text-xs font-normal text-red-500 ml-1">IN</span>
          </span>
        </Link>
      </div>

      {/* Middle Section: Search Input & Suggestions */}
      <div className="relative flex-1 max-w-2xl mx-4">
        <div className="flex items-center">
          <div
            className={`flex flex-1 items-center border rounded-l-full px-4 py-1.5 transition-all ${
              isDarkMode
                ? "bg-zinc-900/90 border-zinc-700 focus-within:border-blue-500 text-white"
                : "bg-zinc-50 border-zinc-300 focus-within:border-blue-500 text-zinc-900"
            }`}
          >
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchSubmit();
              }}
              className="w-full bg-transparent outline-none text-sm placeholder-zinc-400"
            />
          </div>

          <button
            onClick={() => handleSearchSubmit()}
            className={`px-5 py-2 border border-l-0 rounded-r-full transition-colors flex items-center justify-center ${
              isDarkMode
                ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                : "bg-zinc-100 border-zinc-300 text-zinc-600 hover:bg-zinc-200"
            }`}
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            className={`ml-3 p-2 rounded-full transition-colors ${
              isDarkMode ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
            title="Search with voice"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        {/* Autocomplete Dropdown List */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            className={`absolute left-0 right-14 mt-1 rounded-2xl shadow-2xl border py-2 z-50 ${
              isDarkMode
                ? "bg-[#212121] border-zinc-700 text-white"
                : "bg-white border-zinc-200 text-zinc-900"
            }`}
          >
            {suggestions.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSearchQuery(item);
                  handleSearchSubmit(item);
                }}
                className={`flex items-center px-4 py-2 cursor-pointer text-sm font-medium ${
                  isDarkMode ? "hover:bg-zinc-700/60" : "hover:bg-zinc-100"
                }`}
              >
                <Search className="w-4 h-4 mr-3 text-zinc-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Section: Dark Theme Toggle, Create, Notifications & User */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className={`p-2 rounded-full transition-colors ${
            isDarkMode ? "hover:bg-zinc-800 text-amber-400" : "hover:bg-zinc-100 text-indigo-600"
          }`}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button
          className={`p-2 rounded-full transition-colors hidden sm:block ${
            isDarkMode ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"
          }`}
          title="Create"
        >
          <Video className="w-5 h-5" />
        </button>

        <button
          className={`p-2 rounded-full transition-colors hidden sm:block ${
            isDarkMode ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"
          }`}
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
        </button>

        <div className="pl-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer hover:opacity-90">
            V
          </div>
        </div>
      </div>
    </header>
  );
}
