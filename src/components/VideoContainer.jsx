import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard, { AdVideoCard } from "./VideoCard";
import { FALLBACK_VIDEOS } from "../utils/helper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function VideoContainer() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeCategory = useSelector((store) => store.video.activeCategory);
  const isDarkMode = useSelector((store) => store.app.isDarkMode);

  useEffect(() => {
    getVideos();
  }, [activeCategory]);

  const getVideos = async () => {
    setLoading(true);
    try {
      if (activeCategory === "All") {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "snippet,statistics,contentDetails",
              chart: "mostPopular",
              regionCode: "IN",
              maxResults: 24,
              key: "AIzaSyA2u6T9circPfO7BMQQX9j4b2DO5kB8P18",
            },
          }
        );
        if (response.data?.items?.length) {
          setVideos(response.data.items);
        } else {
          setVideos(FALLBACK_VIDEOS);
        }
      } else {
        // Fetch category search videos
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              q: activeCategory,
              maxResults: 24,
              type: "video",
              key: "AIzaSyA2u6T9circPfO7BMQQX9j4b2DO5kB8P18",
            },
          }
        );
        if (response.data?.items?.length) {
          const formatted = response.data.items.map((item) => ({
            id: typeof item.id === "object" ? item.id.videoId : item.id,
            snippet: item.snippet,
            statistics: { viewCount: Math.floor(Math.random() * 900000 + 50000) },
            contentDetails: { duration: "PT15M30S" },
          }));
          setVideos(formatted);
        } else {
          setVideos(FALLBACK_VIDEOS);
        }
      }
    } catch (error) {
      console.warn("YouTube API failed or quota exceeded. Using HD fallback videos.");
      setVideos(FALLBACK_VIDEOS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="animate-pulse space-y-3">
                <div
                  className={`aspect-video rounded-xl ${
                    isDarkMode ? "bg-zinc-800" : "bg-zinc-200"
                  }`}
                />
                <div className="flex space-x-3">
                  <div
                    className={`w-9 h-9 rounded-full ${
                      isDarkMode ? "bg-zinc-800" : "bg-zinc-200"
                    }`}
                  />
                  <div className="flex-1 space-y-2">
                    <div
                      className={`h-4 rounded ${
                        isDarkMode ? "bg-zinc-800" : "bg-zinc-200"
                      }`}
                    />
                    <div
                      className={`h-3 w-2/3 rounded ${
                        isDarkMode ? "bg-zinc-800" : "bg-zinc-200"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
          {videos.length > 0 && (
            <Link
              key={`ad-${videos[0].id || "ad"}`}
              to={`/watch?v=${typeof videos[0].id === "object" ? videos[0].id.videoId : videos[0].id}`}
            >
              <AdVideoCard video={videos[0]} />
            </Link>
          )}

          {videos.slice(1).map((video, idx) => {
            const videoId = typeof video.id === "object" ? video.id.videoId : video.id;
            return (
              <Link key={`${videoId}-${idx}`} to={`/watch?v=${videoId}`}>
                <VideoCard video={video} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
