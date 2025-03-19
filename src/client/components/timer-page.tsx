import { useCallback, useEffect, useState } from "react";
import useInterval from "use-interval";
import { padTime, splitTimeMs } from "~/lib/time";
import { VisualTimer } from "~/client/components/visual-timer";
import { db } from "../db";
import { useUserId } from "../hooks/useUserId";
import { handleError } from "~/lib/error";
import { Link } from "./ui/link";

interface TimerPageProps {
  workLength: number;
  breakLength: number;
  startTime: number;
  others: number;
}

export function TimerPage({
  workLength,
  breakLength,
  startTime,
  others,
}: TimerPageProps) {
  const [periodTime, setPeriodTime] = useState(
    getPeriodTime({ workLength, breakLength, startTime }),
  );

  const syncTime = useCallback(() => {
    setPeriodTime(getPeriodTime({ workLength, breakLength, startTime }));
  }, [workLength, breakLength, startTime]);
  useInterval(syncTime, 50);

  useEffect(() => {
    db.timer
      .add({
        workLength,
        breakLength,
        startTime,
        others: 0,
        createdAt: Date.now(),
      })
      .catch(handleError);
  }, [workLength, breakLength, startTime]);

  const progress = getProgress(
    { periodTime },
    { workLength, breakLength, startTime },
  );

  const status = getStatus({ periodTime }, { workLength, breakLength });
  const { hours, minutes, seconds } = getCountdown(
    { periodTime, status },
    { workLength, breakLength },
  );

  return (
    <main
      role="main"
      className={`animate-fade-in-slow fixed top-0 left-0 z-10 flex size-full h-screen max-h-dvh flex-col items-center justify-center gap-8 bg-zinc-950 p-8`}
    >
      <div className="mt-auto">
        <VisualTimer status={status} progress={progress} />
      </div>
      <div className="flex flex-col flex-wrap items-center justify-between gap-2">
        <div className="font-mono text-2xl">
          {hours > 0 && <span>{padTime(hours)}:</span>}
          {padTime(minutes)}:{padTime(seconds)}
        </div>
        <p className="text-lg italic">
          <span className="animate-fade-in-slow">
            {status === "work" ? "Working" : "Partying"}
            {` in this room with ${others} others`}
          </span>
        </p>
      </div>
      <div className="self-start">
        <Link route={{ page: "home" }}>Home</Link>
      </div>
    </main>
  );
}
function getProgress(
  { periodTime }: { periodTime: number },
  {
    workLength,
    breakLength,
  }: {
    startTime: number;
    workLength: number;
    breakLength: number;
  },
): number {
  if (periodTime > workLength) {
    return (periodTime - workLength) / breakLength;
  } else {
    return periodTime / workLength;
  }
}

function getPeriodTime({
  startTime,
  workLength,
  breakLength,
}: {
  startTime: number;
  workLength: number;
  breakLength: number;
}): number {
  const period = workLength + breakLength;
  const now = Date.now();
  const periodsSinceEpoch = (now - startTime) / period;

  return (periodsSinceEpoch - Math.floor(periodsSinceEpoch)) * period;
}

function getCountdown(
  { periodTime, status }: { periodTime: number; status: "work" | "break" },
  {
    workLength,
    breakLength,
  }: {
    workLength: number;
    breakLength: number;
  },
): { hours: number; minutes: number; seconds: number } {
  switch (status) {
    case "work":
      return splitTimeMs(workLength - periodTime);
    case "break":
      return splitTimeMs(workLength + breakLength - periodTime);
  }
}

function getStatus(
  { periodTime }: { periodTime: number },
  {
    workLength,
  }: {
    workLength: number;
    breakLength: number;
  },
): "work" | "break" {
  return periodTime > workLength ? "break" : "work";
}
