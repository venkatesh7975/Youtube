// Helper utilities for YouTube Clone

export function formatViews(views) {
  if (!views) return "0 views";
  const num = Number(views);
  if (isNaN(num)) return "0 views";
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B views";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M views";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K views";
  }
  return num + " views";
}

export function formatTimeAgo(dateString) {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

const nameList = [
  "Alex Rivers", "TechGeek99", "Sarah Jenkins", "DevGuru", "PixelCoder",
  "Naman Verma", "Jessica Taylor", "Aarav Sharma", "CodeNinja", "Elena Rostova",
  "CyberSamurai", "Priya Patel", "David Miller", "ByteCrusher", "Sophia Chen",
  "Karan Malhotra", "Vikas Singh", "Emily Watson", "Rohan Mehta", "GamerProX"
];

const messageList = [
  "This video is absolutely amazing! 🔥",
  "Can someone explain timestamp 04:20?",
  "Greetings from India! 🇮🇳",
  "Best tutorial on this topic so far 🚀",
  "Subscribed! Keep up the great content!",
  "Loved the explanation in the middle part 👏",
  "Haha that edit was hillarious 😂",
  "Can you make a video on Next.js 15 next?",
  "Awesome visual quality 💯",
  "Watching this live! Let's goooo!",
  "First time catching a stream, glad to be here 🎉",
  "Great job on the code setup!",
  "Could not agree more with your points 👍",
  "Super helpful tips, thanks a lot!"
];

export function generateRandomName() {
  return nameList[Math.floor(Math.random() * nameList.length)];
}

export function generateRandomMessage() {
  return messageList[Math.floor(Math.random() * messageList.length)];
}

export function generateRandomAvatar(id) {
  const seed = id || Math.floor(Math.random() * 1000);
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
}

// Pre-populated Fallback YouTube Data if API Quota fails
export const FALLBACK_VIDEOS = [
  {
    id: "Ks-_Mh1QhMc",
    snippet: {
      publishedAt: "2024-11-10T12:00:00Z",
      channelId: "UCW5YeuERMmlnqo4l88VCAua",
      title: "Building a Fullstack YouTube Clone in React & Node.js",
      description: "Learn how to build a production-ready YouTube clone from scratch using React, Redux Toolkit, Tailwind CSS and YouTube Data API.",
      thumbnails: {
        medium: { url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80" },
        high: { url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80" }
      },
      channelTitle: "Fireship",
      liveBroadcastContent: "none"
    },
    statistics: { viewCount: "1450200", likeCount: "89200", commentCount: "3420" },
    contentDetails: { duration: "PT14M32S" }
  },
  {
    id: "bMknfKXIFA8",
    snippet: {
      publishedAt: "2024-10-15T08:30:00Z",
      channelId: "UCfbNksTwsAKIi70Vp955k_g",
      title: "React 19 Complete Course - What's New in 2025",
      description: "Comprehensive breakdown of React 19 features including Server Actions, useActionState, useOptimistic and Compiler updates.",
      thumbnails: {
        medium: { url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80" },
        high: { url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80" }
      },
      channelTitle: "Code With Harry",
      liveBroadcastContent: "none"
    },
    statistics: { viewCount: "890450", likeCount: "54300", commentCount: "2150" },
    contentDetails: { duration: "PT45M10S" }
  },
  {
    id: "fJ9rUzIMcZQ",
    snippet: {
      publishedAt: "2024-12-01T15:00:00Z",
      channelId: "UCsBjURrPoezykLs9EqgamOA",
      title: "Tailwind CSS v4 Complete Guide - Next Gen Styling",
      description: "Explore the all-new CSS-first configuration and lightning fast Rust engine behind Tailwind CSS version 4.",
      thumbnails: {
        medium: { url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" },
        high: { url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80" }
      },
      channelTitle: "Traversy Media",
      liveBroadcastContent: "none"
    },
    statistics: { viewCount: "560120", likeCount: "38900", commentCount: "1480" },
    contentDetails: { duration: "PT22M15S" }
  },
  {
    id: "7S_tz1z_5bA",
    snippet: {
      publishedAt: "2024-09-20T10:00:00Z",
      channelId: "UCmXmlB4-HJytD7wek0Uo97A",
      title: "Top 10 Web Development Trends for 2025",
      description: "AI coding assistants, Serverless databases, Micro-frontends, and WASM performance tools dominating web dev this year.",
      thumbnails: {
        medium: { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" },
        high: { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80" }
      },
      channelTitle: "Web Dev Simplified",
      liveBroadcastContent: "none"
    },
    statistics: { viewCount: "1230400", likeCount: "74000", commentCount: "2900" },
    contentDetails: { duration: "PT18M45S" }
  },
  {
    id: "dpw9EHDh2bM",
    snippet: {
      publishedAt: "2024-11-28T14:20:00Z",
      channelId: "UC29ju8bIPH5as8OGnQzwB7A",
      title: "Redux Toolkit Tutorial - State Management Made Simple",
      description: "Learn how Redux Toolkit, createSlice, createAsyncThunk and RTK Query simplify React state management dramatically.",
      thumbnails: {
        medium: { url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" },
        high: { url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" }
      },
      channelTitle: "Academind",
      liveBroadcastContent: "none"
    },
    statistics: { viewCount: "670800", likeCount: "41200", commentCount: "1890" },
    contentDetails: { duration: "PT31M05S" }
  },
  {
    id: "w7ejDZ8SWv8",
    snippet: {
      publishedAt: "2024-12-10T11:00:00Z",
      channelId: "UCL_f53ZEJypWVFZS_y82Gzg",
      title: "JavaScript Async/Await & Promises Masterclass",
      description: "Deep dive into Event Loop, Microtasks, Macrotasks, Promise.all, Promise.allSettled and error handling patterns.",
      thumbnails: {
        medium: { url: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80" },
        high: { url: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=1200&q=80" }
      },
      channelTitle: "FreeCodeCamp.org",
      liveBroadcastContent: "none"
    },
    statistics: { viewCount: "2150900", likeCount: "135000", commentCount: "5120" },
    contentDetails: { duration: "PT58M20S" }
  },
  {
    id: "LDB4uaJ87e0",
    snippet: {
      publishedAt: "2024-10-05T09:15:00Z",
      channelId: "UCeVMnSShP_Iviwkknto834g",
      title: "India vs Australia Highlights - Epic Final Thriller",
      description: "Watch the full highlights of the nerve-wracking final over finish with unbelievable bowling and clutch batting.",
      thumbnails: {
        medium: { url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80" },
        high: { url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80" }
      },
      channelTitle: "Sports Central",
      liveBroadcastContent: "none"
    },
    statistics: { viewCount: "4890000", likeCount: "310000", commentCount: "12400" },
    contentDetails: { duration: "PT11M08S" }
  },
  {
    id: "gCYcTMgdE74",
    snippet: {
      publishedAt: "2024-11-01T17:45:00Z",
      channelId: "UCX6OQ3DkcsbYNE6H8uQQuVA",
      title: "Unreal Engine 5.5 Next-Gen Graphics Showcase",
      description: "Photorealistic lighting, Lumen GI, Nanite foliage, and real-time physics in the latest game development showcase.",
      thumbnails: {
        medium: { url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" },
        high: { url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80" }
      },
      channelTitle: "IGN",
      liveBroadcastContent: "none"
    },
    statistics: { viewCount: "1820300", likeCount: "112000", commentCount: "4300" },
    contentDetails: { duration: "PT16M40S" }
  }
];
