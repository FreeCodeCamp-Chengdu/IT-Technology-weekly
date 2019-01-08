import * as matter from "gray-matter";
import * as Config from "config";
import { outputFile } from "fs-extra";

import * as log from "./utils/log";
import { paths } from "./utils/paths";
import {
  getWeeklyChoices,
  getSelectedWeeklyPrompt,
  updateWeeklyContentPrompt,
  getWeeklyUpdatedContent,
  getWeeklyData,
  IWeeklyItem,
  getWeeklyNum
} from "./utils/weekly";

(async () => {
  const weeklyChoices = getWeeklyChoices();

  if (weeklyChoices.length === 0) {
    log.error("failed", "目录为空，修改失败！");
    return;
  }

  const { result: selectedWeeklyName } = (await getSelectedWeeklyPrompt(
    "list",
    weeklyChoices
  )) as any;

  if (!selectedWeeklyName) {
    return;
  }

  const weeklyItem = await updateWeeklyContentPrompt();

  const fullPath = `${paths.weeklyDir}/${selectedWeeklyName}`;
  const { meta, content: preContent } = getWeeklyData(fullPath);

  await outputFile(
    fullPath,
    matter.stringify(
      getWeeklyUpdatedContent(preContent, weeklyItem as IWeeklyItem),
      {
        ...meta
      }
    )
  );

  const { title } = Config.get("weekly");
  const weeklyNum = getWeeklyNum(selectedWeeklyName);

  log.success("success", `${title} 第 ${weeklyNum} 期 修改成功！`);
})();
