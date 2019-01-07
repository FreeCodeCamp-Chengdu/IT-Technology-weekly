import * as Config from "config";
import { outputFile } from "fs-extra";

import * as log from "./utils/log";

import { paths } from "./utils/paths";
import { getLtsWeeklyNum, getWeeklyMeta } from "./utils/weekly";

(async () => {
  const { title, author } = Config.get("weekly");
  const ltsWeeklyNum = getLtsWeeklyNum();
  const weeklyNum = ltsWeeklyNum + 1;
  const meta = getWeeklyMeta({ title, author, weeklyNum });
  const folderName = `issue-${weeklyNum < 10 ? `0${weeklyNum}` : weeklyNum}.md`;

  await outputFile(`${paths.weeklyDir}/${folderName}`, meta);

  log.success("success", `${title} 第 ${weeklyNum} 期 创建成功！`);
})();
