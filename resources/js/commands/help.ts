import { EPTIC } from "../globals";
import {
  type CommandHandler,
  writeLine,
  helpCommands,
  writeEmptyRow,
} from "./init";

const helpHandler: CommandHandler = () => {
  writeEmptyRow();
  writeLine(`${EPTIC.name} ${EPTIC.version}`);
  writeEmptyRow();
  Object.entries(helpCommands)
    .sort()
    .forEach((command) => {
      const line = `<span class="command-text color2">${command[0]}</span>${
        command[1] ?? ""
      }`;
      writeLine(line, "help-command");
    });
  writeEmptyRow();
  return true;
};

export const description = "I guess you know what this does now.";

export default helpHandler;
