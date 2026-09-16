import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/landing pages/LandingPage";
import LandingPageLayout from "./layouts/LandingPageLayout";
import LoginPage from "./Pages/AuthPages/LoginPage";
import RegisterPage from "./Pages/AuthPages/RegisterPage";
import VerifyPage from "./Pages/AuthPages/VerifyPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DasboardLayout from "./layouts/DasboardLayout";
import { useSelector } from "react-redux";
import LandindProtectedRoute from "./layouts/LandindProtectedRoute";
import UserProtectedRoute from "./layouts/UserProtectedRoute";
import { useEffect, useState } from "react";
import Profile from "./Pages/Dashboard/Profile";
import CreateArticle from "./Pages/Dashboard/CreateArticle";
import ExploreArticles from "./Pages/blogPages/ExploreArticles";
import ArticleInfo from "./Pages/blogPages/ArticleInfo";

import { Toaster, toast } from "sonner";
import EditArticlePage from "./Pages/blogPages/EditArticlePage";

const App = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  return (
    <div className="font-sans overflow-x-hidden selection:bg-black selection:text-white">
      <Toaster
        duration={2000}
        className="w-50"
        position="bottom-center"

      />
      {loading ? (
        "loading..."
      ) : (
        <Routes>
          <Route
            element={
              <LandindProtectedRoute user={user}>
                <LandingPageLayout />
              </LandindProtectedRoute>
            }
          >
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyPage />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <UserProtectedRoute user={user}>
                <DasboardLayout />
              </UserProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="create/article" element={<CreateArticle />} />
            <Route path="explore/article" element={<ExploreArticles />} />
            <Route path="article/info/:id" element={<ArticleInfo />} />
            <Route path="edit/article" element={<EditArticlePage />} />
          </Route>
          <Route path="*" element={<div>404 page not found</div>} />
        </Routes>
      )}
    </div>
  );
};

export default App;
