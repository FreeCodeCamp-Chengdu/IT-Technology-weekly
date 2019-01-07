import { readdirSync } from "fs-extra";

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
