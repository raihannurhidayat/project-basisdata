import { BrowserRouter, Routes, Route } from "react-router-dom";
import Threds from "./pages/Threds";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import ThredCreate from "./pages/ThredCreate";
import ThredDetails from "./pages/ThredDetails";
import Profile from "./pages/Profile";
import ThredPost from "./pages/ThredPost";

const App = () => {
  // console.log({ infoUser });
  return (
    <BrowserRouter>
      <Routes>
        {/* route protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/threds" element={<Threds />} />
          <Route path="/threds/:slug" element={<ThredDetails />} />
          {/* <Route path="/threds/create" element={<ThredCreate />} /> */}
          <Route path="/threds/post" element={<ThredPost />} />
          <Route path="/profile/:slug" element={<Profile />} />
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
