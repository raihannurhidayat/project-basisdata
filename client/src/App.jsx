import { BrowserRouter, Routes, Route } from "react-router-dom";
import Threds from "./pages/Threds";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const App = () => {
  // console.log({ infoUser });
  return (
    <BrowserRouter>
      <Routes>
        {/* route protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/threds" element={<Threds />} />
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
