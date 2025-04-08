"use client";

import { type Route } from "~/client/db";
import { naturalToStr } from "~/lib/time";

export function routeToUrl(route: Route): string {
  switch (route.page) {
    case "home":
      return "/";
    case "timer":
      const { workLength, breakLength, startTime } = route;

      let path = "/timer";
      path += `?workLength=${naturalToStr(workLength)}`;
      path += `&breakLength=${naturalToStr(breakLength)}`;
      path += `&startTime=${naturalToStr(startTime)}`;

      return path;
  }
}
