import { prompt } from "inquirer";

export const ask = async (value: string, msg: string, choices: string[]) => {
  if (choices.indexOf(value) !== -1) {
    return value;
  }

  const answer = await prompt([
    {
      type: "list",
      message: msg,
      name: "result",
      choices
    }
  ]);
  return (answer as any).result;
};
