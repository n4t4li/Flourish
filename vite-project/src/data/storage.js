//USER TABLE

export function getUserProfile() {
  return JSON.parse(localStorage.getItem("userProfile")) || null;
}

export function saveUserProfile(profile) {
  localStorage.setItem("userProfile", JSON.stringify(profile));
}

//HABIT TABLE

export function getHabitLogs() {
  return JSON.parse(localStorage.getItem("habitLogs")) || [];
}

export function saveHabitLog(log) {
  const logs = getHabitLogs();
  logs.push(log);
  localStorage.setItem("habitLogs", JSON.stringify(logs));
}

//CLEAR ALL DATA

export function resetAllData() {
  localStorage.clear();
}
