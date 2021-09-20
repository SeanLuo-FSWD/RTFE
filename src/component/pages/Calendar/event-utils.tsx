let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    type: "once",
    start: "Sep 19 2021 00:00:00 GMT-0700 (Pacific Daylight Time)",
    end: "Sep 21 2021 24:00:00 GMT-0700 (Pacific Daylight Time)",
  },
  {
    id: createEventId(),
    title: "Timed event",
    type: "once",
    description: "event description here",
    start: "Sep 21 2021 00:00:00 GMT-0700 (Pacific Daylight Time)",
    end: "Sep 21 2021 24:00:00 GMT-0700 (Pacific Daylight Time)",
  },
  {
    id: createEventId(),
    title: "Monthly reoccuring",
    type: "monthly",
    description: "Monthly event description here",
    days: [20, 30],
  },
  {
    id: createEventId(),
    title: "Weely reoccuring",
    type: "weekly",
    description: "Weely event description here",
    days: [0, 5],
  },
];

export function createEventId() {
  return String(eventGuid++);
}
