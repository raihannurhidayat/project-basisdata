import { BrowserRouter, Routes, Route } from "react-router-dom";
import Threds from "./pages/Threds";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import ThredCreate from "./pages/ThredCreate";
import ThredDetails from "./pages/ThredDetails";
import ProfileUpdate from "./pages/profile/ProfileUpdate";
import ThredPost from "./pages/ThredPost";
import Profile from "./pages/profile/Profile";
import ThredUpdate from "./pages/ThredUpdate";
import PostUpdate from "./pages/PostUpdate";
import AdminPage from "./pages/Admin/AdminPage";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* route protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/threds" element={<Threds />} />
          <Route path="/threds/:slug" element={<ThredDetails />} />
          <Route path="/threds/create" element={<ThredCreate />} />
          <Route path="/threds/update/:slug" element={<ThredUpdate />} />
          <Route path="/threds/post" element={<ThredPost />} />
          <Route path="/profile/:slug" element={<Profile />} />
          <Route path="/profile/update/:slug" element={<ProfileUpdate />} />
          <Route
            path="/post/update/:thread_slug/:post_id"
            element={<PostUpdate />}
          />
        </Route>

        {/* route admin */}
        <Route element={<ProtectedRouteAdmin />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        {/* route auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
