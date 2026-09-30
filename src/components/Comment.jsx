import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

export default function Comment({ comment, onAddReply }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [likesCount, setLikesCount] = useState(comment.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const isDarkMode = useSelector((store) => store.app.isDarkMode);
  const { id, name, text, replies } = comment;

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
      setIsLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setIsLiked(true);
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onAddReply(id, replyText.trim());
    setReplyText("");
    setShowReplyBox(false);
  };

  return (
    <div className="flex space-x-3 my-3 text-xs sm:text-sm">
      <img
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
          name
        )}`}
        alt={name}
        className="w-8 h-8 rounded-full shrink-0 mt-1"
      />

      <div className="flex-1 space-y-1">
        <div className="flex items-center space-x-2">
          <span
            className={`font-semibold text-xs ${
              isDarkMode ? "text-zinc-200" : "text-zinc-900"
            }`}
          >
            @{name.toLowerCase().replace(/\s+/g, "")}
          </span>
          <span className="text-[11px] text-zinc-500">2 hours ago</span>
        </div>

        <p className={isDarkMode ? "text-zinc-300" : "text-zinc-800"}>
          {text}
        </p>

        {/* Comment Actions Bar */}
        <div className="flex items-center space-x-4 pt-1 text-zinc-400">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1.5 hover:text-zinc-200 transition-colors ${
              isLiked ? "text-blue-500 font-semibold" : ""
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span className="text-xs">{likesCount}</span>
          </button>

          <button className="hover:text-zinc-200 transition-colors">
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="flex items-center space-x-1 hover:text-zinc-200 text-xs font-medium transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Reply</span>
          </button>
        </div>

        {/* Inline Reply Input Box */}
        {showReplyBox && (
          <form onSubmit={handleReplySubmit} className="mt-2 flex space-x-2">
            <input
              type="text"
              placeholder={`Reply to @${name.toLowerCase().replace(/\s+/g, "")}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className={`flex-1 px-3 py-1.5 text-xs rounded-lg outline-none border ${
                isDarkMode
                  ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                  : "bg-zinc-100 border-zinc-300 text-zinc-900 placeholder-zinc-400"
              }`}
            />
            <button
              type="submit"
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-medium text-xs rounded-lg transition-colors"
            >
              Reply
            </button>
          </form>
        )}

        {/* Nested Replies Recursion Tree */}
        {replies && replies.length > 0 && (
          <div className="pl-4 border-l-2 border-zinc-300 dark:border-zinc-800 mt-2 space-y-2">
            {replies.map((reply) => (
              <Comment key={reply.id} comment={reply} onAddReply={onAddReply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
