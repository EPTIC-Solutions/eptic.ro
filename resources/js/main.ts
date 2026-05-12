import "./commands/init";
import { commands, loadCommands, writeLine } from "./commands/init";
import { TText } from "./line";

const commandInput = document.querySelector<HTMLDivElement>("#command-input")!;

const line = document.querySelector<HTMLDivElement>("#line")!;
const cursor = document.querySelector<HTMLDivElement>("#cursor")!;
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
    this.index = Math.max(0, this.index - 1);
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
let cursorIndex = 0;
let currentInput = "";

let debugPanel: HTMLDivElement | null = null;

const renderDebugInfo = () => {
  if (!debugPanel) return;

  debugPanel.innerHTML = `
Debug Panel
<p>Current input: ${currentInput}</p>
<p>Cursor index: ${cursorIndex} | Cursor char: ${currentInput[cursorIndex - 1] || ""}</p>
<p>Commands index: ${JSON.stringify(commandsHistory.index)}</p>
<p>Commands last command: ${JSON.stringify(commandsHistory.lastCommand)}</p>
<p>Commands history: ${JSON.stringify(commandsHistory.getHistory())}</p>
`;
};

if (import.meta.env.DEV) {
  debugPanel = document.createElement("div");
  debugPanel.id = "debug-panel";
  debugPanel.style.position = "fixed";
  debugPanel.style.top = "0";
  debugPanel.style.right = "0";
  debugPanel.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  debugPanel.style.color = "white";
  debugPanel.style.padding = "10px";
  debugPanel.style.fontSize = "12px";
  debugPanel.style.zIndex = "1000";
  debugPanel.style.width = "300px";
  document.body.appendChild(debugPanel);

  renderDebugInfo();
}

const resetCursorBlink = () => {
  cursor.getAnimations().forEach((a) => {
    a.cancel();
    a.play();
  });
};

const handleCommandInput = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Enter":
      const input = currentInput.trim().toLocaleLowerCase();

      if (!input) {
        return;
      }

      e.preventDefault();

      commandsHistory.commit();
      currentInput = "";
      cursorIndex = 0;
      const commandWithArgs = input.trim().split(" ");
      const commandName = commandWithArgs[0]!;
      const args = commandWithArgs.slice(1);

      runCommand(commandName, args);
      break;
    case "ArrowUp":
      e.preventDefault();
      commandsHistory.moveUp();
      currentInput = commandsHistory.getCurrentCommand();
      cursorIndex = currentInput.length;
      break;
    case "ArrowDown":
      e.preventDefault();
      commandsHistory.moveDown();
      currentInput = commandsHistory.getCurrentCommand();
      cursorIndex = currentInput.length;
      break;
    case "ArrowLeft":
      e.preventDefault();
      cursorIndex = Math.max(0, cursorIndex - 1);
      break;
    case "ArrowRight":
      e.preventDefault();
      cursorIndex = Math.min(currentInput.length, cursorIndex + 1);
      break;
    case "Backspace":
      e.preventDefault();
      if (cursorIndex !== 0) {
        currentInput =
          currentInput.slice(0, cursorIndex - 1) +
          currentInput.slice(cursorIndex);
        commandInput.textContent = currentInput;
        cursorIndex = Math.max(0, cursorIndex - 1);
        commandsHistory.resetIndex();
        resetCursorBlink();
      }
      break;
    default:
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        currentInput += e.key;
        cursorIndex++;
        commandsHistory.resetIndex();
        resetCursorBlink();
      }
      commandsHistory.lastCommand = currentInput;
  }

  commandInput.textContent = currentInput;
  cursor.style.transform = `translateX(-${currentInput.length - cursorIndex}ch)`;
  if (import.meta.env.DEV) {
    renderDebugInfo();
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
