import "~/client/styles/globals.css";

import { type Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { AppDescription, AppName } from "./manifest";
import { Suspense } from "react";
import { LoadingPage } from "~/client/components/loading-page";
import { Sync } from "~/client/hooks/sync";

export const metadata: Metadata = {
  title: AppName,
  description: AppDescription,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div
          className={`dark flex min-h-dvh flex-col items-center justify-center bg-zinc-950`}
        >
          <Suspense fallback={<LoadingPage />}>{children}</Suspense>
        </div>
        <Sync />
        <Analytics />
      </body>
    </html>
  );
}
