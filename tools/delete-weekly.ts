import { readdirSync, remove } from "fs-extra";
import { prompt } from "inquirer";
import chalk from "chalk";

import { paths } from "./utils/paths";

(async () => {
  const weeklyChoices = readdirSync(paths.weeklyDir);

  if (weeklyChoices.length === 0) {
    console.log();
    console.log(chalk["red"].bold.inverse("failed"));
    console.log(chalk.yellow.bold(`目录为空，删除失败！`));
    console.log();
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

  await selectedDocs.map((docs: string) => {
    remove(`${paths.weeklyDir}/${docs}`, err => {
      if (err) return console.error(err);
    });
  });

  console.log();
  console.log(chalk["red"].bold.inverse("success"));
  console.log(chalk.yellow.bold(`${selectedDocs.join("，")} 删除成功！`));
  console.log();
})();
