import { CommandHandler, writeLine } from "./init";

const clearHandler: CommandHandler = (args) => {
  if (args.length > 0) {
    writeLine({
      line: `Command 'clear' doesn't take any arguments.`,
      classname: "command-not-found",
    });
    return false;
  }

  let lastChild;
  while ((lastChild = window.$<HTMLDivElement>("#terminal").lastChild)) {
    lastChild.remove();
  }
  return true;
};

export const description = "Clear the terminal.";

export default clearHandler;
