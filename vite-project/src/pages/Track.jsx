import { useState } from "react";
import { saveHabitLog } from "../data/storage";
import beeLogo from "../assets/images/Gemini_Generated_Image_bee_energy.png";
import sleepImg from "../assets/images/Sleep.png";

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

  function save() {
    saveHabitLog(form);
    alert("Daily progress logged! 🌼");
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
      </div>
    </div>
  );
}
