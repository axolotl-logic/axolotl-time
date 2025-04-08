"use server";

import { db } from "~/server/db";
import { announces } from "../db/schema";
import { and, count, eq, gt, sql } from "drizzle-orm";
import { z } from "zod";

export async function ping(
  unsafeId: string,
  workLength: number,
  breakLength: number,
  startTime: number,
): Promise<{ buddiesCount: number }> {
  const sessionCutoff = new Date(Date.now() - 1000 * 60 * 60);
  const { data: id, error } = z.string().uuid().safeParse(unsafeId);
  if (error) {
    throw Error("Unexpected usage of API: " + error.message);
  }

  const now = new Date();
  await db
    .insert(announces)
    .values({
      workLength,
      breakLength,
      startTime,
      id: id,
      pingedCount: 1,
      lastPingedAt: now,
    })
    .onConflictDoUpdate({
      target: announces.id,
      set: {
        workLength,
        breakLength,
        startTime,
        pingedCount: sql`${announces.pingedCount} + 1`,
        lastPingedAt: new Date(),
      },
    });

  const buddies = await db
    .select({ count: count() })
    .from(announces)
    .where(
      and(
        gt(announces.lastPingedAt, sessionCutoff),
        eq(announces.workLength, workLength),
        eq(announces.breakLength, breakLength),
        eq(announces.startTime, startTime),
      ),
    );
  if (!buddies[0]) {
    throw Error("Unexpected response from database");
  }

  const resp = {
    buddiesCount: buddies[0].count - 1,
  };

  if (resp.buddiesCount < 0) {
    throw Error("Unexpected state indicating internal error");
  }

  return resp;
}
