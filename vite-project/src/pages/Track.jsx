import { useState, useEffect } from "react";
import { saveHabitLog, getHabitLogs, clearHabitLogs } from "../data/storage";
import beeLogo from "../assets/images/Gemini_Generated_Image_bee_energy.png";
import sleepImg from "../assets/images/Sleep.png";
import BurnoutCircle from "../components/BurnoutCircle";

export default function Track() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    studyHours: "",
    sleepHours: "",
    exerciseDone: false,
    eatingQuality: 3,
    screenTimeHours: "",
    hobbiesMinutes: "",
    mood: "neutral",
  });

  const MOOD_OPTIONS = ["happy", "neutral", "sad", "stressed", "motivated", "tired"];

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function toggleExercise() {
    setForm({ ...form, exerciseDone: !form.exerciseDone });
  }

  const [burnoutScore, setBurnoutScore] = useState(null);
  const [showBurnout, setShowBurnout] = useState(false);
  const [sevenDayAvg, setSevenDayAvg] = useState(null);
  const [savedCount, setSavedCount] = useState(0);
  const [lastSavedAt, setLastSavedAt] = useState(null);

  // On mount, compute 7-day average and show the latest saved burnout if present
  useEffect(() => {
    // Clear existing saved logs on each load/refresh as requested
    clearHabitLogs();
    const logs = getHabitLogs();
    if (logs.length > 0) {
      const recent = logs.slice(-7);
      const scores = recent.map((l) => (l.burnoutScore != null ? l.burnoutScore : computeBurnoutScore(l)));
      const avg = Math.round(scores.reduce((s, v) => s + v, 0) / (scores.length || 1));
      setSevenDayAvg(avg);

      const last = logs[logs.length - 1];
      const lastScore = last.burnoutScore != null ? last.burnoutScore : computeBurnoutScore(last);
      setBurnoutScore(lastScore);
      setShowBurnout(true);
      setSavedCount(logs.length);
      setLastSavedAt(logs[logs.length - 1].savedAt || null);
    }
  }, []);

  function computeBurnoutScore(data) {
    // data contains: studyHours, sleepHours, exerciseDone, eatingQuality, screenTimeHours, hobbiesMinutes, mood
    let score = 50; // base neutral

    const sleepH = Number(data.sleepHours) || 0;
    const studyH = Number(data.studyHours) || 0;
    const screenH = Number(data.screenTimeHours) || 0;
    const hobbies = Number(data.hobbiesMinutes) || 0;
    const eat = Number(data.eatingQuality) || 3;
    const mood = data.mood || 'neutral';

    // Sleep: less sleep => higher burnout. More (upto 9) reduces burnout.
    score += Math.max(0, 7 - sleepH) * 3.8; // each hour less than 7 adds ~3.8
    score -= Math.max(0, sleepH - 8) * 2; // more than 8 reduces burnout

    // Study: long study hours increase burnout
    score += Math.max(0, studyH - 4) * 3; // each hour above 4 adds 3
    score -= Math.max(0, 4 - studyH) * 1.0; // short study may slightly reduce burnout

    // Exercise
    if (!data.exerciseDone) score += 6; else score -= 4;

    // Eating quality: 1-5, target 4-5
    score += (3 - eat) * 4; // lower than 3 increases score

    // Screen time increases burnout
    score += Math.max(0, screenH - 2) * 1.5;

    // Hobbies reduce burnout
    score -= Math.min(hobbies, 120) / 120 * 10; // up to -10

    // Mood mapping
    const moodMap = {
      happy: -8,
      neutral: 0,
      sad: 8,
      stressed: 15,
      motivated: -5,
      tired: 12,
    };
    score += moodMap[mood] || 0;

    // Normalize
    score = Math.round(score);
    if (score < 0) score = 0;
    if (score > 100) score = 100;
    return score;
  }

  function save() {
    // compute burnout score and attach it to the log
    const score = computeBurnoutScore(form);
    const payload = { ...form, burnoutScore: score, savedAt: new Date().toISOString() };
    saveHabitLog(payload);
    alert("Daily progress logged! 🌼");
    // update UI
    setBurnoutScore(score);
    setShowBurnout(true);

    // compute 7-day average using saved logs (includes this one)
    const logs = getHabitLogs();
    const recent = logs.slice(-7);
    const scores = recent.map((l) => (l.burnoutScore != null ? l.burnoutScore : computeBurnoutScore(l)));
    const avg = Math.round(scores.reduce((s, v) => s + v, 0) / (scores.length || 1));
    setSevenDayAvg(avg);
    setSavedCount(logs.length);
    setLastSavedAt(payload.savedAt);
  }

  function exportHabitJson() {
    try {
      const logs = getHabitLogs();
      const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'habit.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export logs: ' + err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white px-6 py-10">

      <div className="flex items-center gap-4 mb-10">
        <img
          src={beeLogo}
          alt="Bee Logo"
          className="w-16 h-16 rounded-full shadow-md bg-white p-1"
        />
        <h1 className="text-4xl font-bold text-yellow-700">
          Daily Habit Tracker
        </h1>
      </div>

      <div className="bg-white/70 backdrop-blur-sm border border-yellow-100 rounded-2xl shadow-md p-6 mb-10 text-center">
        <img src={sleepImg} alt="Sleep tracking" className="mx-auto w-full max-w-[900px] md:max-w-[1200px] h-auto" />
      </div>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-yellow-100">

        <label className="font-semibold text-gray-700 block mb-2">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded-lg shadow-sm"
        />

        <label className="font-semibold text-gray-700 block mb-2">Study Hours</label>
        <input
          type="number"
          name="studyHours"
          placeholder="0"
          value={form.studyHours}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded-lg shadow-sm"
        />

        <label className="font-semibold text-gray-700 block mb-2">Sleep Hours</label>
        <input
          type="number"
          name="sleepHours"
          placeholder="0"
          value={form.sleepHours}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded-lg shadow-sm"
        />

        <label className="font-semibold text-gray-700 block mb-2">
          Exercise Done Today?
        </label>

        <button
          onClick={toggleExercise}
          className={`mb-6 w-full py-3 rounded-lg font-semibold shadow 
            ${form.exerciseDone ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          {form.exerciseDone ? "Yes! I exercised 🏃‍♂️" : "No exercise today"}
        </button>

        <label className="font-semibold text-gray-700 block mb-2">
          Eating Quality (1–5)
        </label>
        <input
          type="range"
          min="1"
          max="5"
          name="eatingQuality"
          value={form.eatingQuality}
          onChange={handleChange}
          className="w-full accent-yellow-500"
        />
        <p className="text-center text-gray-500 mb-6">
          {form.eatingQuality}/5
        </p>

        <label className="font-semibold text-gray-700 block mb-2">Screen Time Hours (optional)</label>
        <input
          type="number"
          name="screenTimeHours"
          placeholder="0"
          value={form.screenTimeHours}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded-lg shadow-sm"
        />

        <label className="font-semibold text-gray-700 block mb-2">Hobbies Minutes (optional)</label>
        <input
          type="number"
          name="hobbiesMinutes"
          placeholder="0"
          value={form.hobbiesMinutes}
          onChange={handleChange}
          className="w-full mb-10 p-3 border rounded-lg shadow-sm"
        />

        <label className="font-semibold text-gray-700 block mb-3">Mood</label>
        <div className="flex flex-wrap gap-3 mb-10">
          {MOOD_OPTIONS.map((m) => (
            <button
              key={m}
              onClick={() => setForm({ ...form, mood: m })}
              className={`px-4 py-2 rounded-full border shadow-sm 
                ${form.mood === m ? "bg-yellow-500 text-white" : "bg-white text-gray-700"}`}
            >
              {m}
            </button>
          ))}
        </div>

        <button
          onClick={save}
          className="w-full py-4 text-lg font-semibold rounded-xl bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg"
        >
          Log Daily Progress
        </button>
        {showBurnout && burnoutScore !== null && (
          <div className="mt-8 text-center">
            <BurnoutCircle score={burnoutScore} size={160} />
            <p className="mt-4 text-gray-700">Your burnout score is {burnoutScore}/100.</p>
            {burnoutScore >= 71 && <p className="text-red-600">Take care — consider resting or speaking with a counselor.</p>}
            {burnoutScore >= 41 && burnoutScore < 71 && <p className="text-orange-500">Moderate burnout — keep an eye, and try relaxation.</p>}
            {burnoutScore < 41 && <p className="text-green-600">Good — you're in a healthy range!</p>}
            {sevenDayAvg !== null && (
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">7-day average burnout</p>
                <div className="flex items-center justify-center gap-4">
                  <BurnoutCircle score={sevenDayAvg} size={100} />
                  <div>
                    <div className="text-lg font-semibold">{sevenDayAvg}/100</div>
                    <div className="text-xs text-gray-500">Last 7 days</div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={exportHabitJson}
                className="inline-block px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 border text-sm"
              >
                Export habit.json
              </button>
              <div className="text-sm text-gray-600">
                <div>Saved logs: <strong>{savedCount}</strong></div>
                {lastSavedAt && <div className="text-xs text-gray-400">Last saved: {new Date(lastSavedAt).toLocaleString()}</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
