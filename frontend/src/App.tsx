import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./lib/AppContext";
import GoogleAuth from "./components/pages/GoogleAuth";
import AuthRequiredRoute from "./components/middleware/AuthRequiredRoute";
import NonAuthRequiredRoute from "./components/middleware/NonAuthRequiredRoute";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="bg-[#121212]">
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/*"
                element={
                  <AuthRequiredRoute>
                    <Routes>
                      <Route path="/" element={<Home />} />
                    </Routes>
                  </AuthRequiredRoute>
                }
              />
              <Route
                path="/auth/*"
                element={
                  <NonAuthRequiredRoute>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/google" element={<GoogleAuth />} />
                    </Routes>
                  </NonAuthRequiredRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AppProvider>
    </div>
  );
}

export default App;
