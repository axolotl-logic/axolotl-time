import { assert } from "./error";

const msPerSecond = 1000;
const msPerMinute = msPerSecond * 60;
const msPerHour = msPerMinute * 60;

export const SECOND = msPerSecond;
export const MINUTE = msPerHour;
export const HOUR = msPerHour;

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
}

export function correctFloatingPointError(timeComps: Time): Time {
  const { hours, minutes, seconds, ms } = timeComps;

  if (seconds === 60) {
    return { hours, minutes: minutes + 1, seconds: 0, ms };
  } else if (minutes === 60) {
    return { hours: hours + 1, minutes: 0, seconds, ms };
  } else if (Math.round(ms) === 1000) {
    return { hours, minutes, seconds: seconds + 1, ms: 0 };
  }

  return timeComps;
}

export function padTime(t: number): string {
  return String(t).padStart(2, "0");
}

export function splitTimeMs(timeMs: number): Time {
  // Convert to hours, truncate the remainder.
  const hoursExact = timeMs / msPerHour;
  const hours = Math.floor(hoursExact);

  // Take the remainder from before and convert to minutes
  const minutesExact = (hoursExact - hours) * 60;
  const minutes = Math.floor(minutesExact);

  // Take the remainder from before and convert to seconds
  const secondsExact = (minutesExact - minutes) * 60;
  const seconds = Math.floor(secondsExact);

  const ms = Math.round((secondsExact - seconds) * 1000);

  return correctFloatingPointError({ hours, minutes, seconds, ms });
}

export function joinTimeMs({ hours = 0, minutes = 0, seconds = 0 }): number {
  return hours * msPerHour + minutes * msPerMinute + seconds * msPerSecond;
}

export function timeInWords(timeMs: number) {
  const timeComps = splitTimeMs(timeMs);

  return (
    Object.entries(timeComps)
      .filter((kv) => kv[0] !== "ms")
      .filter((kv) => kv[1] > 0)
      .map(
        ([key, value]) => `${naturalToStr(value as number)} ${key.toString()}`,
      )
      .join(", ") || "0 seconds"
  );
}

export function naturalToStr(n: number): string {
  assert(!isNaN(n), "naturalToString expected positive number, got NaN");
  assert(n >= 0, "naturalToString expected positive number, got negative");

  return n.toString();
}
