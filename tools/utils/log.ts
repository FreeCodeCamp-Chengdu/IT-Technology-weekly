import chalk from "chalk";

export const success = (tag: string, text: string) => {
  console.log();
  console.log(chalk["green"].bold.inverse(tag));
  console.log(chalk.yellow.bold(text));
  console.log();
};

export const error = (tag: string, text: string) => {
  console.log();
  console.log(chalk["red"].bold.inverse(tag));
  console.log(chalk.yellow.bold(text));
  console.log();
};
