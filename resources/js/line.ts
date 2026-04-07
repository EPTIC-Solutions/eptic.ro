type Color = "default" | "error" | "highlight" | "secondary";

/**
 * TText -> Terminal Text
 */
export class TText {
  public offset = 0;
  public wide = false;

  constructor(
    public line: string | TText | Array<string | TText>,
    public status?: string | TAnchor,
    public color: Color = "default",
    public statusColor: Color = "highlight",
  ) {
    if (this.status instanceof TAnchor) {
      this.status.setColor(this.statusColor);
    }
  }

  public setColor(color: Color): TText {
    this.color = color;
    return this;
  }

  public setStatus(status: string): TText {
    this.status = status;
    return this;
  }

  public setStatusColor(color: Color): TText {
    this.statusColor = color;
    return this;
  }

  public setOffset(offset: number): TText {
    this.offset = offset;
    return this;
  }

  public setWide(wide: boolean = true): TText {
    this.wide = wide;
    return this;
  }

  protected getBaseElement(): HTMLElement {
    return document.createElement("span");
  }

  public getElement(): HTMLElement {
    const el = this.getBaseElement();
    el.classList.add("command-line-text", `color-${this.color}`);
    if (this.offset) {
      el.style.marginLeft = `${this.offset}ch`;
    }
    if (this.wide) {
      el.classList.add("wide");
    }

    const lines = Array.isArray(this.line) ? this.line : [this.line];

    for (const part of lines) {
      if (typeof part === "string") {
        if (part === "") {
          continue;
        }
        const text = document.createTextNode(part);
        el.appendChild(text);
      } else {
        const partNode = part.getElement();
        el.appendChild(partNode);
      }
    }

    return el;
  }

  public getStatusElement(): HTMLElement | null {
    if (!this.status) {
      return null;
    }

    const el = document.createElement("span");
    el.classList.add("command-line-status", `color-${this.statusColor}`);

    if (typeof this.status === "string") {
      el.appendChild(document.createTextNode(this.status));
    } else {
      el.appendChild(this.status.getElement());
    }

    return el;
  }
}

export class TAnchor extends TText {
  constructor(
    public line: string | Array<string | TText>,
    public href: string,
    public target: string = "_blank",
    public color: Color = "default",
  ) {
    super(line, undefined, color);
  }

  protected override getBaseElement(): HTMLAnchorElement {
    const el = document.createElement("a");
    el.href = this.href;
    el.target = this.target;
    return el;
  }
}

export class TBreakRow extends TText {
  constructor() {
    super("");
  }

  protected getBaseElement(): HTMLBRElement {
    return document.createElement("br");
  }
}
