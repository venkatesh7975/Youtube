import React from "react";
import { formatViews, formatTimeAgo } from "../utils/helper";
import { useSelector } from "react-redux";
import { CheckCircle2 } from "lucide-react";

export default function VideoCard({ video }) {
  const isDarkMode = useSelector((store) => store.app.isDarkMode);

  if (!video) return null;

  const { snippet, statistics, contentDetails } = video;
  const channelAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    snippet?.channelTitle || "User"
  )}`;

  // Parse ISO 8601 duration (e.g. PT14M32S -> 14:32)
  const formatDuration = (durationStr) => {
    if (!durationStr) return "12:45";
    const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "10:15";
    const hours = match[1] ? `${match[1]}:` : "";
    const minutes = match[2] ? (match[2].length === 1 && hours ? `0${match[2]}` : match[2]) : "0";
    const seconds = match[3] ? (match[3].length === 1 ? `0${match[3]}` : match[3]) : "00";
    return `${hours}${minutes}:${seconds}`;
  };

  return (
    <div className="group cursor-pointer flex flex-col space-y-2">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-800 shadow-sm">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={
            snippet?.thumbnails?.high?.url ||
            snippet?.thumbnails?.medium?.url ||
            "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80"
          }
          alt={snippet?.title}
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded">
          {formatDuration(contentDetails?.duration)}
        </div>
      </div>

      {/* Info Container */}
      <div className="flex space-x-3 items-start px-0.5">
        <img
          src={channelAvatar}
          alt={snippet?.channelTitle}
          className="w-9 h-9 rounded-full shrink-0 mt-0.5"
        />
        <div className="flex flex-col min-w-0">
          <h3
            className={`font-semibold text-sm line-clamp-2 leading-snug group-hover:text-red-500 transition-colors ${
              isDarkMode ? "text-zinc-100" : "text-zinc-900"
            }`}
            title={snippet?.title}
          >
            {snippet?.title}
          </h3>

          <div className="flex items-center space-x-1 mt-1 text-xs text-zinc-400">
            <span className="truncate hover:text-zinc-200 transition-colors">
              {snippet?.channelTitle}
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 fill-current text-zinc-400 shrink-0" />
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <span>{formatViews(statistics?.viewCount)}</span>
            <span>•</span>
            <span>{formatTimeAgo(snippet?.publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Higher Order Component for Sponsored / Promoted Video Card
export const AdVideoCard = ({ video }) => {
  return (
    <div className="relative border border-amber-500/40 rounded-xl p-1 bg-amber-500/5">
      <div className="absolute top-2 left-2 z-10 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow">
        Sponsored
      </div>
      <VideoCard video={video} />
    </div>
  );
};
