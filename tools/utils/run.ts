import * as spawn from "cross-spawn";

import { IChoicesKey } from "../index";

export const run = (
  script: IChoicesKey,
  envs: { [key: string]: string } = {}
) => {
  const cmd = spawn("npm", ["run", script], {
    stdio: "inherit",
    env: {
      ...process.env,
      ...envs
    }
  });

  process.on("SIGINT", () => {
    cmd.kill("SIGINT");
  });
  process.on("SIGTERM", () => {
    cmd.kill("SIGTERM");
  });
  process.on("exit", () => {
    cmd.kill();
  });
};
