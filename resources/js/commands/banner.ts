import { CommandHandler, writeLine } from "./init";
import { TText } from "../line";

const banner = [
  "__/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\__/\\\\\\\\\\\\\\\\\\\\\\\\\\____/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\__/\\\\\\\\\\\\\\\\\\\\\\________/\\\\\\\\\\\\\\\\\\_",
  " _\\/\\\\\\///////////__\\/\\\\\\/////////\\\\\\_\\///////\\\\\\/////__\\/////\\\\\\///______/\\\\\\////////__",
  "  _\\/\\\\\\_____________\\/\\\\\\_______\\/\\\\\\_______\\/\\\\\\___________\\/\\\\\\_______/\\\\\\/___________",
  "   _\\/\\\\\\\\\\\\\\\\\\\\\\_____\\/\\\\\\\\\\\\\\\\\\\\\\\\\\/________\\/\\\\\\___________\\/\\\\\\______/\\\\\\_____________",
  "    _\\/\\\\\\///////______\\/\\\\\\/////////__________\\/\\\\\\___________\\/\\\\\\_____\\/\\\\\\_____________",
  "     _\\/\\\\\\_____________\\/\\\\\\___________________\\/\\\\\\___________\\/\\\\\\_____\\//\\\\\\____________",
  "      _\\/\\\\\\_____________\\/\\\\\\___________________\\/\\\\\\___________\\/\\\\\\______\\///\\\\\\__________",
  "       _\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_\\/\\\\\\___________________\\/\\\\\\________/\\\\\\\\\\\\\\\\\\\\\\____\\////\\\\\\\\\\\\\\\\\\_",
  "        _\\///////////////__\\///____________________\\///________\\///////////________\\/////////__",
];

const message = [
  new TText("EPTIC (c) All rights reserved."),
  new TText("Welcome to EPTIC.").setColor("secondary"),
  new TText([
    "For a list of available commands, type ",
    new TText("'help'").setColor("highlight"),
    ".",
  ]).setColor("secondary"),
];

const bannerHandler: CommandHandler = (args) => {
  if (args && args.length > 0) {
    writeLine({
      line: new TText(`Command 'banner' doesn't take any arguments.`),
    });
    return false;
  }

  if (window.innerWidth >= 1024) {
    for (const line of banner) {
      writeLine({ line: new TText(line) });
    }
  }
  for (const line of message) {
    writeLine({ line });
  }
  return true;
};

export const description = "Display the header.";

export default bannerHandler;
