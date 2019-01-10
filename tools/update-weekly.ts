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
  getWeeklyNum,
} from "./utils/weekly";

(async () => {
  const weeklyChoices = getWeeklyChoices();

  if (weeklyChoices.length === 0) {
    log.error("failed", "目录为空，修改失败！");
    return;
  }

  const { result: selectedWeeklyName } = (await getSelectedWeeklyPrompt(
    "list",
    weeklyChoices,
  )) as any;

  const weeklyItem = await updateWeeklyContentPrompt();
  const { title, tags: newTags, link } = weeklyItem as IWeeklyItem;

  if (!title || newTags.length === 0 || !link) {
    log.error("failed", `标题，标签和链接不能为空，修改失败！`);
    return;
  }

  const fullPath = `${paths.weeklyDir}/${selectedWeeklyName}`;
  const {
    meta: { count = 0, tags = [], ...otherMeta },
    content: preContent,
  } = getWeeklyData(fullPath);

  await outputFile(
    fullPath,
    matter.stringify(
      getWeeklyUpdatedContent(preContent, weeklyItem as IWeeklyItem, count + 1),
      {
        ...otherMeta,
        count: count + 1,
        tags: [...new Set([...tags, ...newTags])],
      },
    ),
  );

  const { title: weeklyTitle } = Config.get("weekly");
  const weeklyNum = getWeeklyNum(selectedWeeklyName);

  log.success("success", `${weeklyTitle} 第 ${weeklyNum} 期 修改成功！`);
})();
