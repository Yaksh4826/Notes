import { useState } from "react";
import "./App.css";
import { CreatePage } from "./pages/CreatePage";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <div className="flex flex-col min-h-screen font-rl-madena">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
         
            <Route element={<ProtectedRoute />}>
              <Route path="/profile/:id" element={<Profile />} />
               <Route path="/create" element={<CreatePage />} />
              
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
