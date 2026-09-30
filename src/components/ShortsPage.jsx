import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Music2 } from "lucide-react";

const SHORTS_DATA = [
  {
    id: "s1",
    title: "10 JavaScript One-Liners Every Developer Must Know! 🚀 #shorts",
    channel: "Fireship",
    likes: "128K",
    comments: "1.4K",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-code-animation-on-a-computer-screen-41554-large.mp4",
  },
  {
    id: "s2",
    title: "React 19 Server Actions Explained in 30 Seconds! ⚡ #react",
    channel: "Code With Harry",
    likes: "95K",
    comments: "820",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-43343-large.mp4",
  },
];

export default function ShortsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDarkMode = useSelector((store) => store.app.isDarkMode);
  const currentShort = SHORTS_DATA[currentIndex];

  return (
    <div
      className={`min-h-screen flex-1 flex items-center justify-center p-4 transition-colors ${
        isDarkMode ? "bg-[#0f0f0f] text-white" : "bg-zinc-100 text-zinc-900"
      }`}
    >
      <div className="flex items-end space-x-4 max-w-sm w-full">
        {/* Shorts Video Player Container */}
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-black group">
          <video
            src={currentShort.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Overlay Content Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent space-y-2 text-white">
            <div className="flex items-center space-x-2">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentShort.channel}`}
                alt={currentShort.channel}
                className="w-8 h-8 rounded-full border border-white/40"
              />
              <span className="font-bold text-sm">@{currentShort.channel}</span>
              <button className="px-3 py-1 bg-white text-black font-semibold text-xs rounded-full hover:bg-zinc-200">
                Subscribe
              </button>
            </div>
            <p className="text-xs line-clamp-2">{currentShort.title}</p>
            <div className="flex items-center space-x-2 text-[11px] text-zinc-300">
              <Music2 className="w-3.5 h-3.5 animate-spin" />
              <span>Original Sound - {currentShort.channel}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Column */}
        <div className="flex flex-col space-y-5 py-4 text-xs font-semibold">
          <button className="flex flex-col items-center space-y-1">
            <div
              className={`p-3 rounded-full transition-all ${
                isDarkMode ? "bg-zinc-800 hover:bg-zinc-700" : "bg-white hover:bg-zinc-200 shadow"
              }`}
            >
              <ThumbsUp className="w-5 h-5 text-red-500" />
            </div>
            <span>{currentShort.likes}</span>
          </button>

          <button className="flex flex-col items-center space-y-1">
            <div
              className={`p-3 rounded-full transition-all ${
                isDarkMode ? "bg-zinc-800 hover:bg-zinc-700" : "bg-white hover:bg-zinc-200 shadow"
              }`}
            >
              <ThumbsDown className="w-5 h-5" />
            </div>
            <span>Dislike</span>
          </button>

          <button className="flex flex-col items-center space-y-1">
            <div
              className={`p-3 rounded-full transition-all ${
                isDarkMode ? "bg-zinc-800 hover:bg-zinc-700" : "bg-white hover:bg-zinc-200 shadow"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
            </div>
            <span>{currentShort.comments}</span>
          </button>

          <button className="flex flex-col items-center space-y-1">
            <div
              className={`p-3 rounded-full transition-all ${
                isDarkMode ? "bg-zinc-800 hover:bg-zinc-700" : "bg-white hover:bg-zinc-200 shadow"
              }`}
            >
              <Share2 className="w-5 h-5" />
            </div>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
