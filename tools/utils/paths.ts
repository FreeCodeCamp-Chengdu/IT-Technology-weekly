import * as path from "path";
import * as Config from "config";
import { realpathSync } from "fs-extra";

const { dir } = Config.get("weekly");

const appDirectory = realpathSync(process.cwd());
export const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

export const paths = {
  weeklyDir: resolveApp(dir)
};
