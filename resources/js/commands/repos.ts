import { type CommandHandler, writeLine, writeEmptyRow } from "./init";
import { TAnchor, TText } from "../line";

// @ts-ignore
const repos = window.repos as Repo[];

type Repo = {
  full_name: string;
  description: string;
  html_url: string;
  language: string;
};

const reposHandler: CommandHandler = (args) => {
  if (args && args.length > 0) {
    writeLine({
      line: new TText(`Command 'repos' doesn't take any arguments.`),
    });
    return false;
  }

  writeEmptyRow();
  writeLine({ line: new TText("EPTIC repositories:") });
  writeEmptyRow();
  const offset = 2;
  repos.forEach((repo: Repo) => {
    const description = repo.full_name.includes("/eptic.ro")
      ? `The website you are currently on.`
      : repo.description;
    const anchor = new TAnchor(repo.full_name, repo.html_url)
      .setColor("highlight")
      .setOffset(offset);
    const line = new TText([anchor]);

    if (repo.language) {
      line.setStatus(repo.language).setStatusColor("secondary");
    }

    writeLine({
      line,
    });
    if (description) {
      writeLine({
        line: new TText([
          new TText("- ").setColor("secondary"),
          description,
        ]).setOffset(offset + 1),
      });
    }
  });
  return true;
};

export const description = "What we work on.";

export default reposHandler;
