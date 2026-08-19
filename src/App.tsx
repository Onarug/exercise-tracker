import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/UserPage";
import { ExercisePage } from "./pages/ExercisePage";
import { BrowserRouter, Route,Routes } from "react-router";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/exercise/:id" element={<ExercisePage />} />

      </Routes>
    </BrowserRouter>

      );
}

export default App
