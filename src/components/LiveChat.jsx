import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearChat } from "../utils/chatSlice";
import { generateRandomName, generateRandomMessage } from "../utils/helper";
import ChatMessage from "./ChatMessage";
import { Send, MessageSquareText } from "lucide-react";

export default function LiveChat() {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);
  const isDarkMode = useSelector((store) => store.app.isDarkMode);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Poll/simulate incoming live chat stream every 1.5 seconds
    const timer = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: generateRandomMessage(),
        })
      );
    }, 1500);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  // Auto-scroll chat box when new message arrives
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!liveMessage.trim()) return;
    dispatch(
      addMessage({
        name: "You",
        message: liveMessage.trim(),
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Venkatesh",
      })
    );
    setLiveMessage("");
  };

  return (
    <div
      className={`w-full rounded-2xl border flex flex-col h-[520px] shadow-sm overflow-hidden ${
        isDarkMode
          ? "bg-[#181818] border-zinc-800 text-white"
          : "bg-white border-zinc-200 text-zinc-900"
      }`}
    >
      {/* Live Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center space-x-2">
          <MessageSquareText className="w-5 h-5 text-red-500" />
          <h2 className="font-semibold text-sm">Top Chat</h2>
        </div>
        <button
          onClick={() => dispatch(clearChat())}
          className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Messages Stream Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto py-2 space-y-1 scroll-smooth"
      >
        {chatMessages.map((c, i) => (
          <ChatMessage key={i} name={c.name} message={c.message} avatar={c.avatar} />
        ))}
      </div>

      {/* Live Message Input Form */}
      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center space-x-2"
      >
        <input
          type="text"
          placeholder="Chat as You..."
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
          className={`flex-1 px-3 py-1.5 rounded-full text-xs outline-none border transition-colors ${
            isDarkMode
              ? "bg-zinc-900 border-zinc-700 focus:border-red-500 text-white placeholder-zinc-500"
              : "bg-zinc-100 border-zinc-300 focus:border-red-500 text-zinc-900 placeholder-zinc-400"
          }`}
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center justify-center shrink-0"
          title="Send message"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
