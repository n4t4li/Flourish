export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-600">
        <p className="font-medium">Flourish — Built for HackDécouverte</p>
        <p className="mt-2">Made with ❤️ for students who want to flourish.</p>
        <div className="mt-3 space-x-4">
          <a href="#" className="text-yellow-700 hover:underline">About</a>
          <a href="#" className="text-yellow-700 hover:underline">Contact</a>
          <a href="#" className="text-yellow-700 hover:underline">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
