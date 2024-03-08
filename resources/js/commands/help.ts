import { EPTIC } from "../globals";
import {
  type CommandHandler,
  writeLine,
  helpCommands,
  writeEmptyRow,
} from "./init";

const helpHandler: CommandHandler = (args) => {
  if (args.length > 1) {
    writeLine({
      line: "Syntax: help <command> - for more information about a specific command.",
      classname: "command-not-found",
      html: false,
    });
    return false;
  }

  if (args.length === 1) {
    const command = args[0]!;
    if (helpCommands[command]) {
      const argsHelp = command === "help" ? " <command>" : "";
      writeLine({
        line: `Usage:`,
      });
      writeLine({
        line: `  ${helpCommands[command]}`,
        classname: ["command", "color2"],
        html: false,
      });
      writeLine({
        line: `  ${command}${argsHelp}`,
        html: false,
      });
      return true;
    }
    writeLine({
      line: `Command not found '${command}'. For a list of commands type <span class="command">'help'</span>.`,
      classname: "command-not-found",
    });
    return false;
  }

  writeEmptyRow();
  writeLine({ line: `${EPTIC.name} ${EPTIC.version}` });
  writeEmptyRow();
  Object.entries(helpCommands)
    .sort()
    .forEach((command) => {
      const line = `<span class="command-text color2">${command[0]}</span>${
        command[1] ?? ""
      }`;
      writeLine({ line, classname: "help-command" });
    });
  writeEmptyRow();
  return true;
};

export const description = "I guess you know what this does now.";

export default helpHandler;
