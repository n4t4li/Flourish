import { useEffect, useState } from "react";
import workerBee from "../assets/images/workerbee.png";
import queenBee from "../assets/images/queenbee.png";
import droneBee from "../assets/images/dronebee.png";
import honeypot from "../assets/images/honeypot.png";
import logo from "../assets/images/Untitled design.png";
import { getUserProfile, getHabitLogs } from "../data/storage";

export default function Streaks() {
  const [userName, setUserName] = useState("Student");
  const [streak, setStreak] = useState(0);
  const [beeImg, setBeeImg] = useState(workerBee);
  const [beeStatus, setBeeStatus] = useState("Worker Bee");
  const [beeColor, setBeeColor] = useState("#667eea");

  function initializeTestData() {
    const existingCompletions = localStorage.getItem("completions");

    if (!existingCompletions || Object.keys(JSON.parse(existingCompletions)).length === 0) {
      const testHabits = [
        {
          id: "1",
          type: "sleep",
          goal: "8 hours of sleep",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "2",
          type: "exercise",
          goal: "Exercise 1 hour",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "3",
          type: "study",
          goal: "Study 2 hours",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];

      const completions = {};
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split("T")[0];
        testHabits.forEach((habit) => {
          completions[`${habit.id}-${dateKey}`] = {
            habitId: habit.id,
            date: dateKey,
            completedAt: new Date(date.getTime() + Math.random() * 12 * 60 * 60 * 1000).toISOString(),
          };
        });
      }

      localStorage.setItem("habits", JSON.stringify(testHabits));
      localStorage.setItem("completions", JSON.stringify(completions));
    }
  }

  function calculateStreak() {
    // Prefer demo data `habitLogs` if present (demoData.js supplies this)
    const habitLogs = getHabitLogs();
    if (Array.isArray(habitLogs) && habitLogs.length > 0) {
      // Build a set of dates that have any logged habit
      const datesSet = new Set(habitLogs.map((l) => (l.date ? l.date.split("T")[0] : l.date)));
      let streak = 0;
      let currentDate = new Date();
      while (true) {
        const dateKey = currentDate.toISOString().split("T")[0];
        if (datesSet.has(dateKey)) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
          continue;
        }
        break;
      }
      return streak;
    }

    // Fallback to the old `completions/habits` approach for compatibility
    const completions = localStorage.getItem("completions");
    if (!completions) return 0;
    const completionsData = JSON.parse(completions);
    const habits = localStorage.getItem("habits");
    if (!habits) return 0;
    const habitsData = JSON.parse(habits);
    if (habitsData.length === 0) return 0;
    let streak = 0;
    let currentDate2 = new Date();
    while (true) {
      const dateKey = currentDate2.toISOString().split("T")[0];
      const completionKey = `${habitsData[0].id}-${dateKey}`;
      if (completionsData[completionKey]) {
        streak++;
        currentDate2.setDate(currentDate2.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  function updateBeeStatus(s) {
    if (s >= 6) {
      setBeeImg(queenBee);
      setBeeStatus("Queen Bee");
      setBeeColor("#fbbf24");
    } else if (s >= 3) {
      setBeeImg(workerBee);
      setBeeStatus("Worker Bee");
      setBeeColor("#667eea");
    } else {
      setBeeImg(droneBee);
      setBeeStatus("Drone Bee");
      setBeeColor("#94a3b8");
    }
  }

  useEffect(() => {
    // Initialize demo data if missing
    initializeTestData();

    // Load user name
    const user = getUserProfile();
    if (user && user.name) {
      setUserName(user.name);
    }

    // Calculate streak
    const s = calculateStreak();
    setStreak(s);
    updateBeeStatus(s);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <header className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Flourish" className="h-12 w-12 rounded-full bg-white shadow-md p-1" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-6">{userName}'s Stats Chart!</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h1 className="text-xl font-semibold mb-4">Status</h1>
              <div className="flex flex-col items-center">
                <div className="w-36 h-36 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
                  <img src={beeImg} alt={beeStatus} className="h-28 w-auto" />
                </div>
                <p style={{ fontSize: '1.15rem', color: beeColor, fontWeight: 700 }}>{beeStatus}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h1 className="text-xl font-semibold mb-4">Current Streak</h1>
              <div className="flex flex-col items-center">
                <div className="text-6xl font-extrabold text-yellow-600">{streak}</div>
                <p className="mt-2 text-gray-600">Days in a row! 🔥</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-gray-700">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p>
                🐝 <strong>0-2 days streak</strong> = <span className="font-semibold">Drone Bee</span> <br />
                🐝 <strong>3-5 days streak</strong> = <span className="font-semibold">Worker Bee</span> <br />
                👑 <strong>6+ days streak</strong> = <span className="font-semibold">Queen Bee</span>
              </p>
            </div>
          </div>
        </div>

        <section id="features" className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold"> Rewards</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <img src={honeypot} alt="Honeypot reward" className="mx-auto w-28 h-28 object-contain mb-4" />
              <p>Obtain 8 hours of sleep</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <img src={honeypot} alt="Honeypot reward" className="mx-auto w-28 h-28 object-contain mb-4" />
              <p>Less than 1.5 hours of screen time</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <img src={honeypot} alt="Honeypot reward" className="mx-auto w-28 h-28 object-contain mb-4" />
              <p>An hour of exercise</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
