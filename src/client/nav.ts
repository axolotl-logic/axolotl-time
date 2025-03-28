"use client";

import { db } from "~/client/db";
import { handleError } from "~/lib/error";
import { routeToUrl } from "~/client/routes";
import { v4 } from "uuid";
import { type Route } from "./routes";

const SESSION_ID_KEY = "client/nav.ts:sessionId";

export function getSessionId(): string {
  let sessionId = window.sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = v4();
    window.sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }

  return sessionId;
}

export function navigate(route: Route) {
  db.nav
    .add({
      sessionId: getSessionId(),
      page: route.page,
      createdAt: Date.now(),
    })
    .catch(handleError);

  const url = routeToUrl(route);
  if (window.location.href !== url) {
    window.history.pushState(null, "", url);
  }
}
