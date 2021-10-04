import CustomUtil from "../helpers/CustomUtil";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    type: "once",
    description: "first event description here",
    // duration: [
    //   new Date().toISOString().replace(/T.*$/, "") +
    //     " 00:00:00 GMT-0700 (Pacific Daylight Time)",
    //   new Date().toISOString().replace(/T.*$/, "") +
    //     " 00:00:00 GMT-0700 (Pacific Daylight Time)",
    // ],
    duration: [
      CustomUtil.formatTimelessDate(new Date().toDateString(), true),
      CustomUtil.formatTimelessDate(new Date().toDateString(), true),
    ],
    days: [],
  },
  {
    id: createEventId(),
    title: "three days event",
    type: "once",
    description: "first event description here",
    duration: [
      CustomUtil.formatTimelessDate(new Date().toDateString(), true),
      CustomUtil.formatTimelessDate(new Date().toDateString(), true, {
        offsetType: "day",
        amount: 2,
      }),
    ],
    days: [],
  },
  {
    id: createEventId(),
    title: "Monthly reoccuring",
    type: "monthly",
    description: "Monthly event description here",
    days: [15, "month end"],
  },
  {
    id: createEventId(),
    title: "Weely reoccuring",
    type: "weekly",
    description: "Weely event description here",
    days: [6],
  },
];

export function createEventId() {
  return String(eventGuid++);
}
