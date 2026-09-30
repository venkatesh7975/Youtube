import React, { useState } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { MessageSquare } from "lucide-react";

const initialComments = [
  {
    id: "c1",
    name: "Akshay Saini",
    text: "Namaste React! This YouTube clone project architecture is built exceptionally well!",
    likes: 245,
    replies: [
      {
        id: "c1-1",
        name: "Venkatesh",
        text: "Thanks Akshay! Applied Redux Toolkit for caching & debouncing suggestions.",
        likes: 89,
        replies: [
          {
            id: "c1-1-1",
            name: "React Developer",
            text: "The nested comments recursion works so smooth!",
            likes: 34,
            replies: [],
          },
        ],
      },
      {
        id: "c1-2",
        name: "Frontend Fanatic",
        text: "Loved the dark theme aesthetic and live chat integration 🔥",
        likes: 19,
        replies: [],
      },
    ],
  },
  {
    id: "c2",
    name: "Dan Abramov",
    text: "Great job implementing the N-level nested comments tree structure in React!",
    likes: 512,
    replies: [
      {
        id: "c2-1",
        name: "Sarah Jenkins",
        text: "Agreed! It handles state updates recursively with zero re-render issues.",
        likes: 42,
        replies: [],
      },
    ],
  },
  {
    id: "c3",
    name: "Code Master",
    text: "Can someone share the GitHub repository link for this project?",
    likes: 15,
    replies: [],
  },
];

export default function CommentsContainer() {
  const [comments, setComments] = useState(initialComments);
  const [newCommentText, setNewCommentText] = useState("");
  const isDarkMode = useSelector((store) => store.app.isDarkMode);

  // Recursive helper to add a reply inside a nested comment node
  const addReplyRecursive = (list, targetId, text) => {
    return list.map((item) => {
      if (item.id === targetId) {
        return {
          ...item,
          replies: [
            ...item.replies,
            {
              id: `${targetId}-${Date.now()}`,
              name: "You",
              text: text,
              likes: 0,
              replies: [],
            },
          ],
        };
      }
      if (item.replies && item.replies.length > 0) {
        return {
          ...item,
          replies: addReplyRecursive(item.replies, targetId, text),
        };
      }
      return item;
    });
  };

  const handleAddReply = (targetId, text) => {
    setComments((prev) => addReplyRecursive(prev, targetId, text));
  };

  const handleAddTopLevelComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      name: "You",
      text: newCommentText.trim(),
      likes: 0,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setNewCommentText("");
  };

  return (
    <div className="mt-8 space-y-4">
      {/* Comments Header */}
      <div className="flex items-center space-x-2">
        <MessageSquare className="w-5 h-5 text-red-500" />
        <h2 className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
          {comments.length * 3 + 12} Comments
        </h2>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleAddTopLevelComment} className="flex space-x-3 items-start my-4">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Venkatesh"
          alt="You"
          className="w-9 h-9 rounded-full"
        />
        <div className="flex-1 space-y-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className={`w-full bg-transparent border-b outline-none py-1.5 text-sm transition-colors ${
              isDarkMode
                ? "border-zinc-700 focus:border-white text-white placeholder-zinc-500"
                : "border-zinc-300 focus:border-zinc-900 text-zinc-900 placeholder-zinc-400"
            }`}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setNewCommentText("")}
              className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newCommentText.trim()}
              className="px-4 py-1.5 text-xs font-semibold rounded-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white transition-colors"
            >
              Comment
            </button>
          </div>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-4 pt-2">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onAddReply={handleAddReply} />
        ))}
      </div>
    </div>
  );
}
