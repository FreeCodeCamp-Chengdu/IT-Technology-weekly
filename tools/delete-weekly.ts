import { remove } from "fs-extra";

import * as log from "./utils/log";
import { paths } from "./utils/paths";
import { getWeeklyChoices, getSelectedDocsPrompt } from "./utils/weekly";

(async () => {
  const weeklyChoices = getWeeklyChoices();

  if (weeklyChoices.length === 0) {
    log.error("failed", "目录为空，删除失败！");
    return;
  }

  const { result: selectedDocs } = (await getSelectedDocsPrompt(
    weeklyChoices
  )) as any;

  if (selectedDocs.length === 0) {
    return;
  }

  await selectedDocs.map((docs: string) => {
    remove(`${paths.weeklyDir}/${docs}`, err => {
      if (err) return console.error(err);
    });
  });

  log.error("success", `${selectedDocs.join("，")} 删除成功！`);
})();
