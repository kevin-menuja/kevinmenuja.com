import {defineConfig} from "@playwright/test";
const baseURL = "http://127.0.0.1:43871";
export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {baseURL, reducedMotion:"reduce", launchOptions: process.env.CHROME_EXECUTABLE ? {executablePath:process.env.CHROME_EXECUTABLE}:{}},
  webServer: {command:"npm run start -- --port 43871 --hostname 127.0.0.1",url:baseURL,reuseExistingServer:false,timeout:30000}
});
