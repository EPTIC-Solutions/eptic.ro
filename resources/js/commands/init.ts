import { $ } from "../globals";

export type CommandName = string;
export type CommandHandler = (args: string[]) => boolean;

interface CommandHelp {
  [key: CommandName]: string;
}

let commands: Map<CommandName, CommandHandler> = new Map<
  CommandName,
  CommandHandler
>();
let helpCommands: CommandHelp = {};

const registerCommand = (
  commandName: string,
  handler: () => boolean,
  description: string | undefined = undefined
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
      console.error("Module " + path + " does not export a default export.");
      return;
    }
    const formattedPath = path.replace(/^\.\//, "");
    const commandName = formattedPath.replace(/\.[^/.]+$/, "");
    registerCommand(commandName, mod.default as () => boolean, mod.description);
  }

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") {
      return;
    }
    e.preventDefault();

    const inputElement = $<HTMLInputElement>("#command-input");
    const input = inputElement.value;
    const command = input.split(" ")[0]!;
    const matches = Array.from(commands.keys()).filter((c) =>
      c.startsWith(command)
    );
    if (matches.length !== 0) {
      inputElement.value = matches[0]!;
    }
  });
};

type Line = {
  line: string;
  classname?: string | Array<string>;
};

const lines: Line[] = [];

const writeEmptyRow = () => {
  writeLine({ line: "<br>", instant: true });
};

const writeLine = ({
  line,
  classname = undefined,
  instant = false,
  html = true,
}: {
  line: string;
  classname?: string | Array<string>;
  instant?: boolean;
  html?: boolean;
}) => {
  lines.push({ line, classname });
  setTimeout(
    doWriteLine.bind(undefined, html),
    50 * (instant ? 1 : lines.length)
  );
};

const doWriteLine = (isHtml: boolean) => {
  let lineObject;
  if ((lineObject = lines.shift())) {
    const container = document.createElement("div");
    container.classList.add("command-container", "typing");
    const newLine = document.createElement("p");
    container.appendChild(newLine);
    if (isHtml) {
      newLine.innerHTML = lineObject.line;
    } else {
      newLine.innerText = lineObject.line;
    }
    if (lineObject.classname) {
      if (Array.isArray(lineObject.classname)) {
        lineObject.classname.forEach((classname) => {
          newLine.classList.add(classname);
        });
      } else {
        newLine.classList.add(lineObject.classname);
      }
      newLine.classList.add();
    } else {
      newLine.classList.add("command");
    }
    window.$("#terminal").append(container);
    return;
  }
};

addEventListener("animationend", (event) => {
  if (event.animationName !== "typing") {
    return;
  }
  (event.target as HTMLDivElement).style.overflow = "overlay";
  (event.target as HTMLDivElement).classList.remove("typing");
});

export { commands, helpCommands, loadCommands, writeLine, writeEmptyRow };
