import { Link } from "react-router-dom";
import logoImg from "../assets/images/Gemini_Generated_Image_9kgjqi9kgjqi9kgj.png";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center z-20 relative">
      <Link to="/" className="flex items-center gap-3">
        <img src={logoImg} alt="Flourish logo" className="h-16 md:h-20 w-auto object-contain" />
        <span className="sr-only">Flourish</span>
      </Link>
      <div className="flex gap-10 font-medium text-lg md:text-xl">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/track" className="hover:text-blue-600">Track</Link>
        <Link to="/streaks" className="hover:text-blue-600">Streaks</Link>
        <Link to="/tips" className="hover:text-blue-600">Tips</Link>
      </div>
    </nav>
  );
}
