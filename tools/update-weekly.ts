import * as Config from "config";

import * as log from "./utils/log";
import {
  getWeeklyChoices,
  getSelectedDocs,
  newWeekly,
  getLtsWeeklyNum
} from "./utils/weekly";

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

  const { title } = Config.get("weekly");
  const ltsWeeklyNum = getLtsWeeklyNum();
  await newWeekly();

  log.success("success", `${title} 第 ${ltsWeeklyNum} 期 修改成功！`);
})();
