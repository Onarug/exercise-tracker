import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/UserPage";
import { WorkoutPage } from "./pages/WorkoutPage";
import { BrowserRouter, Route,Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user/:id" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
          <Route path="/workout/:id" element={<ProtectedRoute><WorkoutPage /></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>

      );
}

export default App
