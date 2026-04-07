declare global {
  interface Window {
    EPTIC: typeof EPTIC;
  }
}

export const EPTIC = {
  version: "v0.0.2",
  name: "EPTIC Terminal",
  url: "https://terminal.eptic.ro",
};

window.EPTIC = EPTIC;
