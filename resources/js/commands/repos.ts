import { type CommandHandler, writeLine, writeEmptyRow } from "./init";

// @ts-ignore
const repos = window.repos;

type Repo = {
  full_name: string;
  description: string;
  html_url: string;
  language: string;
};

const reposHandler: CommandHandler = () => {
  writeEmptyRow();
  writeLine("EPTIC (wizzymore) online");
  writeEmptyRow();
  repos.forEach((repo: Repo) => {
    const description = repo.full_name.includes("/eptic.ro")
      ? `The website you are currently on.`
      : repo.description;
    writeLine(
      `
      <div><a class="command-text" href="${repo.html_url}" target="_blank">${repo.full_name}</a></div>
    `,
      "repos-command"
    );
    description &&
      writeLine(
        `<span><span class="color2">-</span> ${description}</span>`,
        "repos-command"
      );
  });
  return true;
};

export const description = "What we work on.";

export default reposHandler;
