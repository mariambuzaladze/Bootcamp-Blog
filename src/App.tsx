import "./App.css";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import AddBlogPage from "./pages/AddBlogPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/addBlog" element={<AddBlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
