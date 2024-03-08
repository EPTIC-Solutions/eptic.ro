import { CommandHandler, writeLine } from "./init";

const banner = [
  '<span class="banner">__/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\__/\\\\\\\\\\\\\\\\\\\\\\\\\\____/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\__/\\\\\\\\\\\\\\\\\\\\\\________/\\\\\\\\\\\\\\\\\\_</span>',
  '<span class="banner"> _\\/\\\\\\///////////__\\/\\\\\\/////////\\\\\\_\\///////\\\\\\/////__\\/////\\\\\\///______/\\\\\\////////__</span>',
  '<span class="banner">  _\\/\\\\\\_____________\\/\\\\\\_______\\/\\\\\\_______\\/\\\\\\___________\\/\\\\\\_______/\\\\\\/___________</span>',
  '<span class="banner">   _\\/\\\\\\\\\\\\\\\\\\\\\\_____\\/\\\\\\\\\\\\\\\\\\\\\\\\\\/________\\/\\\\\\___________\\/\\\\\\______/\\\\\\_____________</span>',
  '<span class="banner">    _\\/\\\\\\///////______\\/\\\\\\/////////__________\\/\\\\\\___________\\/\\\\\\_____\\/\\\\\\_____________</span>',
  '<span class="banner">     _\\/\\\\\\_____________\\/\\\\\\___________________\\/\\\\\\___________\\/\\\\\\_____\\//\\\\\\____________</span>',
  '<span class="banner">      _\\/\\\\\\_____________\\/\\\\\\___________________\\/\\\\\\___________\\/\\\\\\______\\///\\\\\\__________</span>',
  '<span class="banner">       _\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_\\/\\\\\\___________________\\/\\\\\\________/\\\\\\\\\\\\\\\\\\\\\\____\\////\\\\\\\\\\\\\\\\\\_</span>',
  '<span class="banner">        _\\///////////////__\\///____________________\\///________\\///////////________\\/////////__</span>',
  '<span class="index">All rights reserved.</span>',
  '<span class="color2">Welcome to my interactive web terminal.</span>',
  '<span class="color2">For a list of available commands, type</span> <span class="highlight">\'help\'</span><span class="color2">.</span>',
];

const bannerHandler: CommandHandler = () => {
  for (const line of banner) {
    writeLine(line);
  }
  return true;
};

export const description = "Display the header.";

export default bannerHandler;
