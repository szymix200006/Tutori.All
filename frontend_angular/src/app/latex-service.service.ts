import { Injectable } from '@angular/core';
import * as latex from 'latex.js';

@Injectable({
  providedIn: 'root'
})
export class LatexServiceService {
  renderLatex(latexInput: string): DocumentFragment {
    const latexDocument = latex.parse(latexInput);
    const htmlOutput = latexDocument.htmlDocument();
    return htmlOutput;
  }
}
