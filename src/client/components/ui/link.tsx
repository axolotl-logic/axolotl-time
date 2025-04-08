import { type ReactNode } from "react";
import { routeToUrl } from "~/client/nav";

import { type Route } from "~/client/db";

export function Link({
  route,
  children,
}: {
  route: Route;
  children: ReactNode;
}) {
  const href = routeToUrl(route);

  return (
    <a
      href={href}
      className="p-4 text-blue-400 underline hover:cursor-pointer hover:text-purple-400"
    >
      {children}
    </a>
  );
}
