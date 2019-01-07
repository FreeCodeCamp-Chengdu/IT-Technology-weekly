import * as Config from "config";
import { outputFile, readFileSync } from "fs-extra";

import * as log from "./utils/log";
import {
  getWeeklyChoices,
  getSelectedDocs,
  updateWeekly,
  getWeeklyName,
  getLtsWeeklyNum
} from "./utils/weekly";
import { paths } from "./utils/paths";

(async () => {
  const weeklyChoices = getWeeklyChoices();

  if (weeklyChoices.length === 0) {
    log.error("failed", "目录为空，修改失败！");
    return;
  }

  const { result: selectedDocs } = (await getSelectedDocs(
    weeklyChoices
  )) as any;

  if (selectedDocs.length === 0) {
    return;
  }

  const { title: weeklyTitle } = Config.get("weekly");
  const ltsWeeklyNum = getLtsWeeklyNum();
  const { title, excerpt, link } = (await updateWeekly()) as any;
  const folderName = getWeeklyName(ltsWeeklyNum);
  const fullPath = `${paths.weeklyDir}/${folderName}`;

  const mdText = readFileSync(fullPath, "utf-8");
  await outputFile(
    fullPath,
    `${mdText}

${title}

${excerpt}

${link}`
  );

  log.success("success", `${weeklyTitle} 第 ${ltsWeeklyNum} 期 修改成功！`);
})();
