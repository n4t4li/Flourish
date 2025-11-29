import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Track from "./pages/Track";
import Streaks from "./pages/Streaks";
import Tips from "./pages/Tips";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track" element={<Track />} />
          <Route path="/streaks" element={<Streaks />} />
          <Route path="/tips" element={<Tips />} />
        </Routes>
      </div>
    </Router>
  );
}
