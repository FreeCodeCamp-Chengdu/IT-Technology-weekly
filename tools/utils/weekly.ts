import * as matter from "gray-matter";
import { readdirSync } from "fs-extra";
import { prompt } from "inquirer";

import { paths } from "./paths";

export interface IWeeklyItem {
  title: string;
  excerpt: string;
  link: string;
}

export const getWeeklyData = (path: string) => {
  const { data, content } = matter.read(path);
  return { meta: data, content };
};

export const getWeeklyMeta = (path: string) => {
  const { meta } = getWeeklyData(path);
  return meta;
};

export const getWeeklyContent = (path: string) => {
  const { content } = getWeeklyData(path);
  return content;
};

export const getWeeklyNum = (weeklyName: string): number => {
  return parseInt(
    weeklyName.slice(weeklyName.indexOf("-") + 1, weeklyName.indexOf("."))
  );
};

export const getWeeklyChoices = () => {
  return readdirSync(paths.weeklyDir).reverse();
};

export const getWeeklyName = (weeklyNum: number) => {
  return `issue-${weeklyNum < 10 ? `0${weeklyNum}` : weeklyNum}.md`;
};

export const getSelectedWeeklyPrompt = async (
  type: "list" | "checkbox",
  weeklyChoices: string[]
) => {
  return await prompt([
    {
      type,
      message: "请选择",
      name: "result",
      choices: weeklyChoices
    }
  ]);
};

export const getWeeklyInitMeta = ({
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

export const getWeeklyUpdatedContent = (
  preContent: string,
  { title, excerpt, link }: IWeeklyItem
) => {
  return `${preContent}

## [${title}](${link})

${excerpt}`;
};

export const updateWeeklyContentPrompt = async () => {
  return await prompt([
    {
      type: "input",
      message: "标题",
      name: "title"
    },
    {
      type: "input",
      message: "概要",
      name: "excerpt"
    },
    {
      type: "input",
      message: "链接",
      name: "link"
    }
  ]);
};
