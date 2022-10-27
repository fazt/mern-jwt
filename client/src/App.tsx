import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import MovieForm from "./pages/MovieForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Authenticated pages */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/new" element={<MovieForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
