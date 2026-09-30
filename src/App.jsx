import React from "react";
import { Provider, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import store from "./utils/store";
import Head from "./components/Head";
import Body from "./components/Body";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import SearchResultsPage from "./components/SearchResultsPage";
import ShortsPage from "./components/ShortsPage";
import SideBar from "./components/Sidebar";

function AppLayout() {
  const isDarkMode = useSelector((store) => store.app.isDarkMode);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDarkMode ? "bg-[#0f0f0f] text-white" : "bg-white text-zinc-900"
      }`}
    >
      <Head />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "/watch",
        element: <WatchPage />,
      },
      {
        path: "/results",
        element: <SearchResultsPage />,
      },
      {
        path: "/shorts",
        element: <ShortsPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}
