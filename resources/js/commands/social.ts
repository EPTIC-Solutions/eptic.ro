import { type CommandHandler, writeLine, writeEmptyRow } from "./init";

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
  {
    name: "twitter",
    url: "https://twitter.com/CristianBilu",
    description: "twitter/CristianBilu",
  },
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

const socialHandler: CommandHandler = () => {
  writeEmptyRow();
  writeLine("EPTIC online");
  writeEmptyRow();
  socials.forEach((line) => {
    writeLine(
      `
    <span class="command-text color2">${line.name}</span> <a href="${line.url}" target="_blank">${line.description}</a>
    `,
      "social-command"
    );
  });

  return true;
};

export const description = "Show the social links.";

export default socialHandler;
