import * as Config from "config";
import { outputFile } from "fs-extra";
import chalk from "chalk";

import { paths } from "./utils/paths";
import { getLtsWeeklyNum, getWeeklyMeta } from "./utils/weekly";

(async () => {
  const { title, author } = Config.get("weekly");
  const ltsWeeklyNum = getLtsWeeklyNum();
  const weeklyNum = ltsWeeklyNum + 1;
  const meta = getWeeklyMeta({ title, author, weeklyNum });
  const folderName = `issue-${weeklyNum < 10 ? `0${weeklyNum}` : weeklyNum}.md`;

  await outputFile(`${paths.weeklyDir}/${folderName}`, meta);

  console.log();
  console.log(chalk["green"].bold.inverse("success"));
  console.log(chalk.yellow.bold(`${title} 第 ${weeklyNum} 期 创建成功！`));
  console.log();
})();
