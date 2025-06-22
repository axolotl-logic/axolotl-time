"use client";

import { useEffect, useState } from "react";
import { useTimer } from "../db";
import { syncWithServer } from "../hooks/sync";
import { handleError } from "~/lib/error";

export function VisualTimer({
  status,
  progress,
}: {
  status: "break" | "work";
  progress: number;
}) {
  const timer = useTimer();
  const [lastStatus, setLastStatus] = useState(status);

  useEffect(() => {
    if (status !== lastStatus && timer !== null) {
      setLastStatus(status);
      syncWithServer(timer).catch(handleError);
    }
  }, [status, setLastStatus, lastStatus, timer]);

  let radialColor: string;
  switch (status) {
    case "break":
      radialColor = "text-pink-400";
      break;
    case "work":
      radialColor = "text-purple-300";
      break;
  }

  return (
    <div
      className={`radial-progress text-5xl ${radialColor}`}
      style={
        {
          "--value": Math.floor(progress * 100),
          "--size": "300px",
          "--thickness": "35px",
        } as React.CSSProperties
      }
      role="figure"
    >
      {status}
    </div>
  );
}
