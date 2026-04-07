import { type CommandHandler, writeLine, writeEmptyRow } from "./init";
import { TAnchor, TText } from "../line";

const socials = [
  {
    name: "github",
    url: "https://github.com/wizzymore",
    description: "github.com/wizzymore",
  },
  {
    name: "github ORG",
    url: "https://github.com/EPTIC-Solutions",
    description: "github.com/EPTIC-Solutions",
  },
  // {
  //   name: "twitter",
  //   url: "https://twitter.com/CristianBilu",
  //   description: "twitter/CristianBilu",
  // },
  {
    name: "npm",
    url: "https://npmjs.com/~wizzymore",
    description: "npmjs/~wizzymore",
  },
  {
    name: "npm - eptic",
    url: "https://npmjs.com/~eptic",
    description: "npmjs/~eptic",
  },
  {
    name: "packagist - eptic",
    url: "https://packagist.org/packages/eptic/",
    description: "packagist/eptic",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/cristian-bilu/",
    description: "linkedin/cristian-bilu",
  },
];

const socialHandler: CommandHandler = (args) => {
  if (args && args.length > 0) {
    writeLine({
      line: new TText(`Command 'social' doesn't take any arguments.`).setColor(
        "error",
      ),
    });
    return false;
  }

  writeEmptyRow();
  writeLine({ line: new TText("EPTIC Online") });
  writeEmptyRow();
  socials.forEach((social) => {
    writeLine({
      line: new TText(social.name, new TAnchor(social.description, social.url)),
    });
  });

  return true;
};

export const description = "Show the social links.";

export default socialHandler;
