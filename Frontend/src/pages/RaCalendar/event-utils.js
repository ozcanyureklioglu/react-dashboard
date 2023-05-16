let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "Toplantı",
    start: todayStr,
    color: "purple",
  },
  {
    id: createEventId(),
    title: "Buluşma",
    start: todayStr + "T12:00:00",
    end: todayStr + "T16:00:00",
    color: "purple",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
