import * as matter from "gray-matter";
import * as Config from "config";
import { readdirSync } from "fs-extra";
import { prompt } from "inquirer";

import { paths } from "./paths";

export interface IWeekly {
  title: string;
  author: string;
  link: string;
  tags: string[];
  count: number;
  editor: string;
}

export interface IWeeklyItem {
  title: string;
  excerpt: string;
  link: string;
  tags: string[];
}

export const getWeeklyData = (path: string) => {
  const { data, content } = matter.read(path) as {
    data: IWeekly;
    content: string;
  };
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
  const { editors } = Config.get("weekly");

  return matter.stringify("", {
    title: `${title} 第 ${weeklyNum} 期`,
    author: `${author}`,
    count: 0,
    editor: editors[weeklyNum % editors.length],
    published: false
  });
};

export const getWeeklyUpdatedContent = (
  preContent: string,
  { title, excerpt, link }: IWeeklyItem,
  index: number
) => {
  return `${preContent}

## ${index}、[${title}](${link})

${excerpt}`;
};

export const updateWeeklyContentPrompt = async () => {
  const { tags } = Config.get("weekly");

  return await prompt([
    {
      type: "input",
      message: "标题",
      name: "title",
      default: "xxx"
    },
    {
      type: "checkbox",
      message: "标签",
      name: "tags",
      choices: tags,
      default: tags.slice(0, 1)
    },
    {
      type: "input",
      message: "概要",
      name: "excerpt",
      default: "xxx"
    },
    {
      type: "input",
      message: "链接",
      name: "link",
      default: "https://"
    }
  ]);
};
