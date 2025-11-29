import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Flourish</h1>
      <div className="flex gap-6 font-medium">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/track" className="hover:text-blue-600">Track</Link>
        <Link to="/streaks" className="hover:text-blue-600">Streaks</Link>
        <Link to="/tips" className="hover:text-blue-600">Tips</Link>
      </div>
    </nav>
  );
}
