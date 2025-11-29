import heroBee from "../assets/images/chat_image_2.png";
import rewardsImg from "../assets/images/chatgpt_image.png";
import logo from "../assets/images/chat_image_2.png";
import graphImg from "../assets/images/image_graph.png";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen">
      
      {/* Hero Section */}
      <header className="text-center px-6 py-24">
        <h1 className="text-6xl md:text-7xl font-extrabold text-yellow-700 drop-shadow-sm">
          Welcome <span className="text-yellow-600">Student</span>!
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mt-6 max-w-3xl mx-auto">
          Build better habits, one day at a time.  
        </p>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
          Flourish is the ultimate habit companion for students.  
          Track your progress, stay consistent, unlock rewards, and grow every day.
        </p>
      </header>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        
        <div className="bg-white text-center rounded-2xl shadow-lg p-8 border border-yellow-100 hover:shadow-xl transition-transform hover:-translate-y-1">
          <h3 className="text-2xl md:text-3xl font-semibold text-yellow-700 mb-3">Progress Graph</h3>
          <img src={graphImg} alt="Progress graph" className="w-48 md:w-56 mx-auto rounded-lg mb-4" />
          <p className="text-gray-600">
            This graph represents the evolution of your stats over time.
          </p>
        </div>

        
          <div className="bg-white text-center rounded-2xl shadow-lg p-8 border border-yellow-100 hover:shadow-xl transition-transform hover:-translate-y-1">
          <h3 className="text-2xl md:text-3xl font-semibold text-yellow-700 mb-4">Streaks & Rewards</h3>
          <img
            src={heroBee}
            alt="Bee energy rewards"
            className="w-56 md:w-64 mx-auto rounded-lg"
          />
          <p className="text-gray-600 mt-4">Check out your streaks and your rewards! Keep the momentum going!</p>
        </div>

        <div className="bg-white text-center rounded-2xl shadow-lg p-8 border border-yellow-100 hover:shadow-xl transition-transform hover:-translate-y-1">
          <h3 className="text-2xl md:text-3xl font-semibold text-yellow-700 mb-4">Tips & Advice</h3>
          <img
            src={rewardsImg}
            alt="Wellness tips"
            className="w-56 md:w-64 mx-auto rounded-lg"
          />
          <div className="mt-4">
            <button
              className="inline-block px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
              onClick={() => alert('Mood quiz coming soon! We will help you understand your emotions better.')}
            >
              How are you feeling today?
            </button>
          </div>
          <p className="text-gray-600 mt-4">Take the quiz above to get a better understanding of your emotions.</p>
        </div>
      </section>

      {/* Why Flourish Section */}
      <section className="bg-yellow-100/40 py-20 mt-12">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-yellow-800 mb-12">
          Why Choose Flourish?
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 px-6">
          
          <div className="bg-white text-center rounded-xl shadow p-8 hover:shadow-lg transition">
            <h3 className="text-2xl md:text-3xl font-semibold text-yellow-700 mb-3">
              Simple Tracking
            </h3>
            <p className="text-lg text-gray-600">
              One-click daily logging designed for speed and convenience.
            </p>
          </div>

          <div className="bg-white text-center rounded-xl shadow p-8 hover:shadow-lg transition">
            <h3 className="text-2xl md:text-3xl font-semibold text-yellow-700 mb-3">
              Inspiring Streaks
            </h3>
            <p className="text-lg text-gray-600">
              Stay motivated by maintaining daily streaks and consistency.
            </p>
          </div>

          <div className="bg-white text-center rounded-xl shadow p-8 hover:shadow-lg transition">
            <h3 className="text-2xl md:text-3xl font-semibold text-yellow-700 mb-3">
              Earn Rewards
            </h3>
            <p className="text-lg text-gray-600">
              Celebrate every milestone with badges, awards, and achievements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
