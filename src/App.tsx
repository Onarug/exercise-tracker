import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/UserPage";
import { ExercisePage } from "./pages/ExercisePage";
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
          <Route path="/exercise/:id" element={<ProtectedRoute><ExercisePage /></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>

      );
}

export default App
