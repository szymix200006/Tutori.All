declare module 'latex.js' {
    // Define the LaTeX document and rendering methods that latex.js provides
  
    export class HTMLGenerator {
      document: Document;
      constructor({hyphenate: boolean}) {}
      render: (doc: Document) => HTMLElement;
    }
  
    export class Parser {
      parse: (latex: string, {generator: HTMLGenerator}) => Document;
    }
  
    export function parse(latex: string, {generator: HTMLGenerator}): Document;
  
    export class Document {
      htmlDocument(): DocumentFragment;
      html: string;
    }
  }