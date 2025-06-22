"use client";

import { putTimer } from "~/client/db";
import { ping } from "~/server/actions";
import { getUserId } from "./useUserId";

export async function syncWithServer({
  workLength,
  breakLength,
  startTime,
}: {
  workLength: number;
  breakLength: number;
  startTime: number;
}) {
  const userId = getUserId();

  await ping(userId, workLength, breakLength, startTime).then(
    async ({ buddiesCount }) => {
      await putTimer({
        workLength,
        breakLength,
        startTime,
        others: buddiesCount,
      });
    },
  );
}
