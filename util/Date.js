import moment from "moment";
import { format } from "date-fns";

export function firstDayOfMonth() {
  const firstDayOfMonth = moment()
    .startOf("month")
    .format("dddd, MMMM Do YYYY");
  return firstDayOfMonth;
}
export function lastDayOfMonth() {
  const lastDayOfMonth = moment().endOf("month").format("dddd, MMMM Do YYYY");
  return lastDayOfMonth;
}
export function afterSevenDays() {
  const afterSevenDays = moment()
    .endOf("month")
    .add(7, "days")
    .format("dddd, MMMM Do YYYY");
  return afterSevenDays;
}
export function todayTimestamp() {
  const todayTimestamp = moment().valueOf();
  return todayTimestamp;
}
const currentDate = new Date();
const monthAbbreviation = format(currentDate, "MMM");
export const currentDates = {
  month: monthAbbreviation,
};
