import * as figlet from "figlet";
import chalk from "chalk";

import { ask } from "./utils/ask";
import { run } from "./utils/run";

enum ChoicesKey {
  weekly = "wk",
}

enum WeeklyKey {
  add = "新增周刊",
  u = "修改周刊",
  d = "删除周刊",
  r = "发布周刊",
}

type IWeeklyKey = keyof typeof WeeklyKey;

const weeklyScript = {
  [WeeklyKey.add]: "add-weekly",
  [WeeklyKey.u]: "update-weekly",
  [WeeklyKey.d]: "delete-weekly",
  [WeeklyKey.r]: "release-weekly",
};

const weeklyChoices = [WeeklyKey.add, WeeklyKey.u, WeeklyKey.d, WeeklyKey.r];

const Choices = {
  [ChoicesKey.weekly]: weeklyChoices,
};

export type IChoicesKey = keyof typeof Choices;

const magicFlow = async () => {
  const action = process.argv[2] || "";
  const subAction = process.argv[3];

  if (Object.keys(WeeklyKey).includes(subAction)) {
    run(ChoicesKey.weekly, {
      WEEKLY_SCRIPT: weeklyScript[WeeklyKey[subAction as IWeeklyKey]],
    });
    return;
  }

  const answer = (await ask(
    action,
    "Magic Flow",
    Choices[(action || ChoicesKey.weekly) as IChoicesKey],
  )) as WeeklyKey;

  run(ChoicesKey.weekly, { WEEKLY_SCRIPT: weeklyScript[answer] });
};

(() => {
  figlet.text("IT Technology Weekly", (err: any, data) => {
    if (err) {
      console.dir(err);
      process.exit(1);
    }
    console.log(chalk.cyan(data!));
    console.log();

    magicFlow();
  });
})();
