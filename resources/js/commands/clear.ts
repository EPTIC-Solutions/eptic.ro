import { CommandHandler, writeLine } from "./init";
import { TText } from "../line";

const clearHandler: CommandHandler = (args) => {
  if (args && args.length > 0) {
    writeLine({
      line: new TText(`Command 'clear' doesn't take any arguments.`),
    });
    return false;
  }

  let lastChild;
  while (
    (lastChild = document.querySelector<HTMLDivElement>("#terminal")?.lastChild)
  ) {
    lastChild.remove();
  }
  return true;
};

export const description = "Clear the terminal.";

export default clearHandler;
