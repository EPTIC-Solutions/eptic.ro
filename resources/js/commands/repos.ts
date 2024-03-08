import { type CommandHandler, writeLine, writeEmptyRow } from "./init";

// @ts-ignore
const repos = window.repos;

type Repo = {
  full_name: string;
  description: string;
  html_url: string;
  language: string;
};

const reposHandler: CommandHandler = (args) => {
  if (args.length > 0) {
    writeLine({
      line: `Command 'repos' doesn't take any arguments.`,
      classname: "command-not-found",
    });
    return false;
  }

  writeEmptyRow();
  writeLine({ line: "EPTIC repositories:" });
  writeEmptyRow();
  repos.forEach((repo: Repo) => {
    const description = repo.full_name.includes("/eptic.ro")
      ? `The website you are currently on.`
      : repo.description;
    writeLine({
      line: `
      <div><a class="command-text" href="${repo.html_url}" target="_blank">${repo.full_name}</a></div>
    `,
      classname: "repos-command",
    });
    description &&
      writeLine({
        line: `<span><span class="color2">-</span> ${description}</span>`,
        classname: "repos-command",
      });
  });
  return true;
};

export const description = "What we work on.";

export default reposHandler;
