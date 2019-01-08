import * as Config from "config";
import { readdirSync, outputFile } from "fs-extra";

import * as log from "./utils/log";
import { paths } from "./utils/paths";
import { getWeeklyNum, getWeeklyInitMeta, getWeeklyName } from "./utils/weekly";

(async () => {
  const { title, author } = Config.get("weekly");
  const ltsWeeklyName = readdirSync(paths.weeklyDir).pop();
  const ltsWeeklyNum = ltsWeeklyName ? getWeeklyNum(ltsWeeklyName) : 0;
  const weeklyNum = ltsWeeklyNum + 1;
  const meta = getWeeklyInitMeta({ title, author, weeklyNum });
  const folderName = getWeeklyName(weeklyNum);

  await outputFile(`${paths.weeklyDir}/${folderName}`, meta);

  log.success("success", `${title} 第 ${weeklyNum} 期 创建成功！`);
})();
