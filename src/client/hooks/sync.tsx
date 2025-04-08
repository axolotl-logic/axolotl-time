"use client";

import { putTimer, useTimer } from "~/client/db";
import { useCallback, useEffect } from "react";
import { handleError } from "~/lib/error";
import { ping } from "~/server/actions";
import { MINUTE } from "~/lib/time";
import { useInterval } from "usehooks-ts";
import { useUserId } from "./useUserId";

export function Sync() {
  useSync();
  return <></>;
}
export function useSync() {
  const userId = useUserId();
  const timer = useTimer();

  const syncWithServer = useCallback(() => {
    if (!timer) {
      return;
    }
    const { workLength, breakLength, startTime } = timer;

    ping(userId, workLength, breakLength, startTime)
      .then(async ({ buddiesCount }) => {
        await putTimer({
          workLength,
          breakLength,
          startTime,
          others: buddiesCount,
        });
      })
      .catch((err: unknown) => {
        handleError(err);
      });
  }, [userId, timer]);

  useInterval(syncWithServer, 10 * MINUTE);
  useEffect(() => {
    syncWithServer();
  }, [syncWithServer]);
}
