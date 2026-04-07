import { TBreakRow, TText } from "../line";

export type CommandName = string;
export type CommandHandler = (args?: string[]) => boolean;

interface CommandHelp {
  [key: CommandName]: string;
}

const terminal = document.querySelector<HTMLDivElement>("#terminal")!;

let commands: Map<CommandName, CommandHandler> = new Map<
  CommandName,
  CommandHandler
>();
let helpCommands: CommandHelp = {};

const registerCommand = (
  commandName: string,
  handler: () => boolean,
  description: string | undefined = undefined,
) => {
  Object.assign(commands, { [commandName]: handler });
  commands.set(commandName, handler);
  Object.assign(helpCommands, { [commandName]: description });
};

const loadCommands = () => {
  const modules = import.meta.glob("./*", { eager: true });

  for (const path in modules) {
    const mod = modules[path] as any;
    if (!mod.default) {
      continue;
    }
    const formattedPath = path.replace(/^\.\//, "");
    const commandName = formattedPath.replace(/\.[^/.]+$/, "");
    registerCommand(commandName, mod.default as () => boolean, mod.description);
  }
};

const lines: TText[] = [];

const writeEmptyRow = () => {
  writeLine({ line: new TBreakRow() });
};

const writeLine = ({
  line,
  instant = false,
}: {
  line: TText;
  instant?: boolean;
  html?: boolean;
}) => {
  lines.push(line);
  setTimeout(doWriteLine, 50 * (instant ? 1 : lines.length));
};

const doWriteLine = () => {
  let line;
  if ((line = lines.shift())) {
    const container = document.createElement("div");
    container.classList.add("command-container");

    container.appendChild(line.getElement());

    let statusEl;
    if ((statusEl = line.getStatusElement())) {
      container.appendChild(statusEl);
    }

    terminal.appendChild(container);
    return;
  }
};

export { commands, helpCommands, loadCommands, writeLine, writeEmptyRow };
