import * as matter from "gray-matter";
import { outputFile } from "fs-extra";

import * as log from "./utils/log";
import { paths } from "./utils/paths";
import {
  getWeeklyChoices,
  getSelectedWeeklyPrompt,
  getWeeklyData,
} from "./utils/weekly";

(async () => {
  const weeklyChoices = getWeeklyChoices();

  if (weeklyChoices.length === 0) {
    log.error("failed", "目录为空，发布失败！");
    return;
  }

  const { result: selectedWeeklyName } = (await getSelectedWeeklyPrompt(
    "list",
    weeklyChoices,
  )) as any;

  const fullPath = `${paths.weeklyDir}/${selectedWeeklyName}`;
  const { meta, content } = getWeeklyData(fullPath);

  await outputFile(
    fullPath,
    matter.stringify(content, {
      ...meta,
      published: true,
    }),
  );

  log.error("success", `${selectedWeeklyName} 发布成功！`);
})();
