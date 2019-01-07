import { readdirSync, remove } from "fs-extra";
import { prompt } from "inquirer";

import * as log from "./utils/log";
import { paths } from "./utils/paths";

(async () => {
  const weeklyChoices = readdirSync(paths.weeklyDir);

  if (weeklyChoices.length === 0) {
    log.error("failed", "目录为空，删除失败！");
    return;
  }

  const answer = await prompt([
    {
      type: "checkbox",
      message: "请选择",
      name: "result",
      choices: weeklyChoices
    }
  ]);
  const selectedDocs = (answer as any).result;

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
