import { readdirSync } from "fs-extra";
import { prompt } from "inquirer";

import { paths } from "./paths";

export const getWeeklyMeta = ({
  title,
  author,
  weeklyNum
}: {
  title: string;
  author: string;
  weeklyNum: number;
}) => {
  return `---
title: ${title} 第 ${weeklyNum} 期
author: ${author}
tags: 
date: 
---`;
};

export const getLtsWeeklyNum = (): number => {
  const ltsWeeklyName = readdirSync(paths.weeklyDir).pop();

  if (ltsWeeklyName) {
    return parseInt(
      ltsWeeklyName.slice(
        ltsWeeklyName.indexOf("-") + 1,
        ltsWeeklyName.indexOf(".")
      )
    );
  }
  return 0;
};

export const getWeeklyChoices = () => {
  return readdirSync(paths.weeklyDir);
};

export const getSelectedDocs = async (weeklyChoices: string[]) => {
  return await prompt([
    {
      type: "checkbox",
      message: "请选择",
      name: "result",
      choices: weeklyChoices
    }
  ]);
};
