declare global {
  interface Window {
    $: typeof $;
    EPTIC: typeof EPTIC;
  }
}

const $ = <T extends Element>(selector: string) => {
  return document.querySelector<T>(selector)!;
};
window.$ = $;

export { $ };

export const EPTIC = {
  version: "v0.0.1",
  name: "EPTIC Terminal",
  url: "https://terminal.eptic.ro",
};

window.EPTIC = EPTIC;
