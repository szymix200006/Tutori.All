declare module 'latex.js' {
    // Define the LaTeX document and rendering methods that latex.js provides
  
    export class HTMLGenerator {
      document: Document;
      render: (doc: Document) => HTMLElement;
    }
  
    export class Parser {
      parse: (latex: string) => Document;
    }
  
    export function parse(latex: string): Document;
  
    export class Document {
      htmlDocument(): DocumentFragment;
      html: string;
    }
  }