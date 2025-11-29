localStorage.setItem("userProfile", JSON.stringify({
  name: "Jean",
  age: 20,
  sex: "M"
}));

localStorage.setItem("habitLogs", JSON.stringify([
  {
    date: "2025-11-25",
    studyHours: 3,
    sleepHours: 8,
    exerciseDone: true,
    eatingQuality: 4,
    screenTimeHours: 3,
    hobbiesMinutes: 30,
    mood: "motivated"
  },
  {
    date: "2025-11-26",
    studyHours: 1,
    sleepHours: 6,
    exerciseDone: false,
    eatingQuality: 2,
    screenTimeHours: 6,
    hobbiesMinutes: 15,
    mood: "stressed"
  },
  {
    date: "2025-11-27",
    studyHours: 2,
    sleepHours: 5,
    exerciseDone: false,
    eatingQuality: 3,
    screenTimeHours: 7,
    hobbiesMinutes: 0,
    mood: "tired"
  },
  {
    date: "2025-11-28",
    studyHours: 4,
    sleepHours: 8,
    exerciseDone: true,
    eatingQuality: 5,
    screenTimeHours: 2,
    hobbiesMinutes: 35,
    mood: "happy"
  },
  {
    date: "2025-11-29",
    studyHours: 2,
    sleepHours: 7,
    exerciseDone: true,
    eatingQuality: 4,
    screenTimeHours: 3,
    hobbiesMinutes: 20,
    mood: "neutral"
  }
]));
