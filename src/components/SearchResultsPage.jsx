import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { FALLBACK_VIDEOS, formatViews, formatTimeAgo } from "../utils/helper";
import { useSelector } from "react-redux";
import { CheckCircle2, Search } from "lucide-react";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const isDarkMode = useSelector((store) => store.app.isDarkMode);

  useEffect(() => {
    fetchSearchResults();
    window.scrollTo(0, 0);
  }, [query]);

  const fetchSearchResults = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: query,
            maxResults: 20,
            type: "video",
            key: "AIzaSyA2u6T9circPfO7BMQQX9j4b2DO5kB8P18",
          },
        }
      );
      if (response.data?.items?.length) {
        setResults(response.data.items);
      } else {
        filterFallback();
      }
    } catch (err) {
      filterFallback();
    } finally {
      setLoading(false);
    }
  };

  const filterFallback = () => {
    const matched = FALLBACK_VIDEOS.filter((v) =>
      v.snippet.title.toLowerCase().includes(query.toLowerCase()) ||
      v.snippet.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(matched.length > 0 ? matched : FALLBACK_VIDEOS);
  };

  return (
    <div
      className={`min-h-screen flex-1 p-4 lg:p-6 transition-colors ${
        isDarkMode ? "bg-[#0f0f0f] text-white" : "bg-white text-zinc-900"
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Results Info Banner */}
        <div className="flex items-center space-x-2 text-zinc-400 text-sm pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <Search className="w-4 h-4 text-red-500" />
          <span>
            Search results for "<strong className="text-white">{query}</strong>"
          </span>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 animate-pulse">
                  <div
                    className={`w-full sm:w-80 aspect-video rounded-xl ${
                      isDarkMode ? "bg-zinc-800" : "bg-zinc-200"
                    }`}
                  />
                  <div className="flex-1 space-y-2 py-2">
                    <div
                      className={`h-5 w-3/4 rounded ${
                        isDarkMode ? "bg-zinc-800" : "bg-zinc-200"
                      }`}
                    />
                    <div
                      className={`h-4 w-1/3 rounded ${
                        isDarkMode ? "bg-zinc-800" : "bg-zinc-200"
                      }`}
                    />
                    <div
                      className={`h-4 w-1/2 rounded ${
                        isDarkMode ? "bg-zinc-800" : "bg-zinc-200"
                      }`}
                    />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((item, idx) => {
              const videoId = typeof item.id === "object" ? item.id.videoId : item.id;
              const snippet = item.snippet;

              return (
                <Link
                  key={`${videoId}-${idx}`}
                  to={`/watch?v=${videoId}`}
                  className={`flex flex-col sm:flex-row gap-4 p-2.5 rounded-2xl transition-all group ${
                    isDarkMode ? "hover:bg-zinc-800/60" : "hover:bg-zinc-100"
                  }`}
                >
                  {/* Video Thumbnail */}
                  <div className="relative w-full sm:w-80 aspect-video rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                    <img
                      src={
                        snippet.thumbnails?.high?.url ||
                        snippet.thumbnails?.medium?.url
                      }
                      alt={snippet.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded">
                      15:30
                    </div>
                  </div>

                  {/* Video Content Metadata */}
                  <div className="flex-1 min-w-0 flex flex-col justify-start space-y-1.5 py-1">
                    <h2
                      className={`font-semibold text-base sm:text-lg line-clamp-2 leading-snug group-hover:text-red-500 transition-colors ${
                        isDarkMode ? "text-zinc-100" : "text-zinc-900"
                      }`}
                    >
                      {snippet.title}
                    </h2>

                    <div className="flex items-center space-x-2 text-xs text-zinc-400">
                      <span>{formatViews(item.statistics?.viewCount || 540000)}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(snippet.publishedAt)}</span>
                    </div>

                    <div className="flex items-center space-x-2 py-1">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                          snippet.channelTitle
                        )}`}
                        alt={snippet.channelTitle}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs text-zinc-400 font-medium">
                        {snippet.channelTitle}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 fill-current text-zinc-400" />
                    </div>

                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {snippet.description || "Watch full video on YouTube. High definition tutorial with complete source code."}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
