import "./commands/init";
import { commands, loadCommands, writeLine } from "./commands/init";
import { TText } from "./line";

const commandInput = document.querySelector<HTMLDivElement>("#command-input")!;

const line = document.querySelector<HTMLDivElement>("#line")!;
let currentInput = "";

class CommandsHistory {
  public history: string[] = [];
  public index: number = 0;
  public lastCommand: string = "";

  getHistory(): string[] {
    return this.history.concat();
  }

  getCurrentCommand(): string {
    return this.history[this.index] || this.lastCommand;
  }

  moveUp(): void {
    if (this.index === this.history.length) {
      this.lastCommand = currentInput;
    }
    if (this.index > 0) {
      this.index--;
    }
  }

  moveDown(): void {
    if (this.index < this.history.length) {
      this.index++;
    }
  }

  commit(): void {
    this.history.push(this.lastCommand);
    this.resetIndex();
    this.lastCommand = "";
  }

  resetIndex(): void {
    this.index = this.history.length;
  }
}

const commandsHistory = new CommandsHistory();

const handleCommandInput = (e: KeyboardEvent) => {
  e.preventDefault();
  switch (e.key) {
    case "Enter":
      const input = currentInput.trim().toLocaleLowerCase();

      if (!input) {
        return;
      }

      commandsHistory.commit();
      currentInput = "";
      const commandWithArgs = input.trim().split(" ");
      const commandName = commandWithArgs[0]!;
      const args = commandWithArgs.slice(1);

      runCommand(commandName, args);
      break;
    case "ArrowUp":
      commandsHistory.moveUp();
      currentInput = commandsHistory.getCurrentCommand();
      break;
    case "ArrowDown":
      commandsHistory.moveDown();
      currentInput = commandsHistory.getCurrentCommand();
      break;
    case "Backspace":
      currentInput = currentInput.slice(0, -1);
      commandInput.textContent = currentInput;
      break;
    default:
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        currentInput += e.key;
      }
      commandsHistory.lastCommand = currentInput;
  }

  if (currentInput !== commandInput.textContent) {
    commandInput.textContent = currentInput;
    commandsHistory.resetIndex();
  }
};

let hiderTimeout: ReturnType<typeof setTimeout> | undefined = undefined;

const runCommand = (commandName: string, args: string[]) => {
  line.hidden = true;
  hiderTimeout = setTimeout(() => {
    line.hidden = false;
    scroll({ behavior: "instant", top: document.body.scrollHeight });
  }, 50);
  let command;
  if ((command = commands.get(commandName))) {
    console.log("Running command", { commandName, args });
    command(args);
  } else {
    writeLine({
      line: new TText([
        `Command not found '${commandName}'. For a list of commands type `,
        new TText("'help'").setColor("highlight"),
        ".",
      ]).setColor("error"),
    });
  }
};

const bootstrap = async () => {
  loadCommands();

  window.addEventListener("keydown", handleCommandInput);

  const mutation = new MutationObserver(() => {
    line.hidden = true;
    if (hiderTimeout !== undefined) {
      clearTimeout(hiderTimeout);
    }

    scroll({ behavior: "instant", top: document.body.scrollHeight });

    hiderTimeout = setTimeout(() => {
      line.hidden = false;
      scroll({ behavior: "instant", top: document.body.scrollHeight });
    }, 50);
  });

  mutation.observe(document.querySelector<HTMLDivElement>("#terminal")!, {
    childList: true,
  });

  document.querySelector<HTMLDivElement>("#app")!.classList.remove("loading");
  document.querySelector<HTMLDivElement>("#loader")!.remove();

  // Show the initial Header Banner
  if ("banner" in commands) {
    runCommand("banner", []);
  }
};

window.onload = bootstrap;
