import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    activeCategory: "All",
    searchResults: [],
    likedVideos: [],
    watchHistory: [],
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    toggleLikeVideo: (state, action) => {
      const videoId = action.payload;
      if (state.likedVideos.includes(videoId)) {
        state.likedVideos = state.likedVideos.filter((id) => id !== videoId);
      } else {
        state.likedVideos.push(videoId);
      }
    },
    addToHistory: (state, action) => {
      const video = action.payload;
      // avoid duplicates in history
      state.watchHistory = [
        video,
        ...state.watchHistory.filter((item) => item.id !== video.id),
      ].slice(0, 50);
    },
  },
});

export const {
  setActiveCategory,
  setSearchResults,
  toggleLikeVideo,
  addToHistory,
} = videoSlice.actions;

export default videoSlice.reducer;
