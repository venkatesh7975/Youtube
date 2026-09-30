import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams, Link } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import { FALLBACK_VIDEOS, formatViews, formatTimeAgo } from "../utils/helper";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  CheckCircle2,
  MessageSquareText,
  ListVideo,
} from "lucide-react";

export default function WatchPage() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v") || "Ks-_Mh1QhMc";

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(48200);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'related'

  const dispatch = useDispatch();
  const isDarkMode = useSelector((store) => store.app.isDarkMode);

  // Find video metadata or match from fallback
  const video =
    FALLBACK_VIDEOS.find((v) => v.id === videoId) || FALLBACK_VIDEOS[0];

  useEffect(() => {
    dispatch(closeMenu());
    window.scrollTo(0, 0);
  }, [videoId, dispatch]);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
      setIsLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setIsLiked(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col lg:flex-row p-4 lg:p-6 gap-6 transition-colors ${
        isDarkMode ? "bg-[#0f0f0f] text-white" : "bg-white text-zinc-900"
      }`}
    >
      {/* Main Video & Comments Container (Left Column) */}
      <div className="flex-1 min-w-0">
        {/* Responsive iFrame Video Player Container */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info Section */}
        <div className="mt-4 space-y-3">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">
            {video.snippet.title}
          </h1>

          {/* Channel Bar & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
            {/* Channel Info */}
            <div className="flex items-center space-x-3">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                  video.snippet.channelTitle
                )}`}
                alt={video.snippet.channelTitle}
                className="w-10 h-10 rounded-full shrink-0"
              />
              <div>
                <div className="flex items-center space-x-1 font-semibold text-sm">
                  <span>{video.snippet.channelTitle}</span>
                  <CheckCircle2 className="w-4 h-4 fill-current text-zinc-400" />
                </div>
                <div className="text-xs text-zinc-400">1.25M subscribers</div>
              </div>

              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`ml-4 px-5 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all shadow ${
                  isSubscribed
                    ? isDarkMode
                      ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                      : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            {/* Action Buttons: Like, Share, Save */}
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <div
                className={`flex items-center rounded-full overflow-hidden border transition-colors ${
                  isDarkMode
                    ? "bg-zinc-800 border-zinc-700 text-zinc-200"
                    : "bg-zinc-100 border-zinc-300 text-zinc-800"
                }`}
              >
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1.5 px-4 py-2 hover:bg-zinc-500/20 transition-colors ${
                    isLiked ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{formatViews(likesCount).replace(" views", "")}</span>
                </button>
                <div className="w-[1px] h-5 bg-zinc-700/50" />
                <button className="px-3 py-2 hover:bg-zinc-500/20 transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleShare}
                className={`relative flex items-center space-x-1.5 px-4 py-2 rounded-full border transition-colors ${
                  isDarkMode
                    ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-200"
                    : "bg-zinc-100 border-zinc-300 hover:bg-zinc-200 text-zinc-800"
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? "Link Copied!" : "Share"}</span>
              </button>

              <button
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-full border transition-colors hidden sm:flex ${
                  isDarkMode
                    ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-200"
                    : "bg-zinc-100 border-zinc-300 hover:bg-zinc-200 text-zinc-800"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Expandable Video Description Box */}
          <div
            className={`p-4 rounded-2xl text-xs sm:text-sm space-y-2 cursor-pointer transition-all ${
              isDarkMode ? "bg-zinc-900/80 hover:bg-zinc-900" : "bg-zinc-100 hover:bg-zinc-200/80"
            }`}
            onClick={() => setShowFullDesc(!showFullDesc)}
          >
            <div className="flex items-center space-x-2 font-semibold text-xs text-zinc-400">
              <span>{formatViews(video.statistics?.viewCount)}</span>
              <span>•</span>
              <span>{formatTimeAgo(video.snippet?.publishedAt)}</span>
            </div>

            <p className={`whitespace-pre-line leading-relaxed ${showFullDesc ? "" : "line-clamp-2"}`}>
              {video.snippet.description}
            </p>

            <button className="font-bold text-xs text-red-500 hover:underline">
              {showFullDesc ? "Show less" : "...more"}
            </button>
          </div>
        </div>

        {/* Nested Comments Section */}
        <CommentsContainer />
      </div>

      {/* Right Column: Live Chat & Related Videos */}
      <div className="w-full lg:w-96 shrink-0 space-y-4">
        {/* Tab Selector Buttons */}
        <div
          className={`flex rounded-xl p-1 border ${
            isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200"
          }`}
        >
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-colors ${
              activeTab === "chat"
                ? isDarkMode
                  ? "bg-zinc-800 text-white"
                  : "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <MessageSquareText className="w-4 h-4 text-red-500" />
            <span>Live Chat</span>
          </button>

          <button
            onClick={() => setActiveTab("related")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-colors ${
              activeTab === "related"
                ? isDarkMode
                  ? "bg-zinc-800 text-white"
                  : "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <ListVideo className="w-4 h-4 text-blue-500" />
            <span>Recommended</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "chat" ? (
          <LiveChat />
        ) : (
          <div className="space-y-3">
            {FALLBACK_VIDEOS.map((item) => (
              <Link
                key={item.id}
                to={`/watch?v=${item.id}`}
                className={`flex space-x-3 p-1.5 rounded-xl transition-colors group ${
                  isDarkMode ? "hover:bg-zinc-800/60" : "hover:bg-zinc-100"
                }`}
              >
                <div className="relative aspect-video w-36 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    alt={item.snippet.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h4
                    className={`font-semibold text-xs line-clamp-2 leading-snug group-hover:text-red-500 transition-colors ${
                      isDarkMode ? "text-zinc-100" : "text-zinc-900"
                    }`}
                  >
                    {item.snippet.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 truncate">
                    {item.snippet.channelTitle}
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    {formatViews(item.statistics.viewCount)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
