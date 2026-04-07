import { EPTIC } from "../globals";
import {
  type CommandHandler,
  writeLine,
  helpCommands,
  writeEmptyRow,
} from "./init";
import { TText } from "../line";

const helpHandler: CommandHandler = (args) => {
  if (!args || args.length > 1) {
    writeLine({
      line: new TText(
        "Syntax: help <command> - for more information about a specific command.",
      ),
      html: false,
    });
    return false;
  }

  if (args.length === 1) {
    const command = args[0]!;
    if (helpCommands[command]) {
      const argsHelp = command === "help" ? " <command>" : "";
      writeLine({
        line: new TText(`Usage:`),
      });
      writeLine({
        line: new TText(`  ${helpCommands[command]}`),
      });
      writeLine({
        line: new TText(`  ${command}${argsHelp}`),
      });
      return true;
    }
    writeLine({
      line: new TText([
        `Command not found '${command}'. For a list of commands type `,
        new TText("'help'").setColor("highlight"),
        ".",
      ]).setColor("error"),
    });
    return false;
  }

  writeEmptyRow();
  writeLine({ line: new TText(`${EPTIC.name} - ${EPTIC.version}`) });
  writeEmptyRow();
  Object.entries(helpCommands)
    .sort()
    .forEach((command) => {
      writeLine({
        line: new TText(command[0], command[1]).setStatusColor("highlight"),
      });
    });
  writeEmptyRow();
  return true;
};

export const description = "I guess you know what this does now.";

export default helpHandler;
