import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { ToastContainer, toast } from "react-toastify";
import AuthProvider from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route to="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AuthProvider>
  );
}

export default App;
