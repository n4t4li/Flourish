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
  // Also write to 'habit' key for compatibility with file export/use cases
  try {
    localStorage.setItem("habit", JSON.stringify(logs));
  } catch (err) {
    // ignore, localStorage might be full or unavailable
    console.warn('Failed to set habit key in localStorage:', err);
  }
}

export function clearHabitLogs() {
  try {
    localStorage.removeItem("habitLogs");
    localStorage.removeItem("habit");
  } catch (err) {
    console.warn('Failed clearing habit keys in localStorage:', err);
  }
}

//CLEAR ALL DATA

export function resetAllData() {
  localStorage.clear();
}
