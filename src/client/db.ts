import Dexie, { type EntityTable } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { v4 as uuid } from "uuid";

const SESSION_ID_KEY = "client/db.ts:sessionId";

export function getSessionId(): string {
  let sessionId = window.sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = uuid();
    window.sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }

  return sessionId;
}

export interface TimerState {
  id: string;
  createdAt: number;
  workLength: number;
  breakLength: number;
  startTime: number;
  others?: number;
  sessionId?: string;
}

export type Route =
  | {
      page: "home";
    }
  | {
      page: "timer";
      startTime: number;
      workLength: number;
      breakLength: number;
    };

const db = new Dexie("AppState") as Dexie & {
  timer: EntityTable<TimerState, "id">;
};

db.version(9).stores({
  timer: "id,workLength,breakLength,startTime,createdAt,sessionId,others",
});

export { db };

export async function putTimer({
  workLength,
  breakLength,
  startTime,
  others,
}: {
  workLength: number;
  breakLength: number;
  startTime: number;
  others?: number;
}) {
  const sessionId = getSessionId();

  await db.timer.put({
    id: [workLength, breakLength, startTime, sessionId]
      .map((x) => x.toString())
      .join(","),
    sessionId,
    workLength,
    breakLength,
    startTime,
    others,
    createdAt: Date.now(),
  });
}

// The most recently created timer in this session
export function useTimer(): TimerState | null {
  const timer = useLiveQuery(async () => {
    const rows = await db.timer
      .where("sessionId")
      .equals(getSessionId())
      .sortBy("createdAt");

    return rows[rows.length - 1];
  });

  return timer ?? null;
}
