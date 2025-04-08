import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    dir: "./tests/vitest",
    browser: {
      provider: "playwright",
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
    },
    testTimeout: 1000 * 60,
    setupFiles: "./tests/vitest/setup.ts",
    coverage: {
      reportsDirectory: "./reports/coverage",
      provider: "istanbul",
    },
  },
});
