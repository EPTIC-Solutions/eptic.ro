import { CommandHandler } from "./init";

const clearHandler: CommandHandler = () => {
  let lastChild;
  while ((lastChild = window.$<HTMLDivElement>("#terminal").lastChild)) {
    lastChild.remove();
  }
  return true;
};

export const description = "Clear the terminal.";

export default clearHandler;
