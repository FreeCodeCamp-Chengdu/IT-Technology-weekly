import { removeSync } from "fs-extra";

import * as log from "./utils/log";
import { paths } from "./utils/paths";
import { getWeeklyChoices, getSelectedWeeklyPrompt } from "./utils/weekly";

(async () => {
  const weeklyChoices = getWeeklyChoices();

  if (weeklyChoices.length === 0) {
    log.error("failed", "目录为空，删除失败！");
    return;
  }

  const { result: selectedWeeklys } = (await getSelectedWeeklyPrompt(
    "checkbox",
    weeklyChoices,
  )) as any;

  if (selectedWeeklys.length === 0) {
    return;
  }

  selectedWeeklys.map((weeklyName: string) => {
    removeSync(`${paths.weeklyDir}/${weeklyName}`);
  });

  log.error("success", `${selectedWeeklys.join("，")} 删除成功！`);
})();
