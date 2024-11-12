import { Injectable } from '@angular/core';
import { CustomHtmlWithProps, ElementValueObj, MediaHtmlProperties, StaticHtmlProperties } from '../utils/types';
import katex from 'katex';

@Injectable({
  providedIn: 'root'
})
export class LatexServiceService {
    generate(text: string, files: File[] | null | undefined): HTMLDivElement {
        const project = this.generateValidObject(text);
        return this.generateTutorialPage(project, files);
    }

    generateTutorialPage(project: CustomHtmlWithProps[], files: File[] | null | undefined): HTMLDivElement {
        const mainDiv = document.createElement('div');
        mainDiv.style.width = '100%';
        mainDiv.style.height = '100%';
        mainDiv.style.display = 'flex';
        mainDiv.style.flexDirection = 'column';

        let reader = new FileReader();

        for(let htmlElement of project) {
            const validHtmlElement = this.generateHtmlElement(htmlElement);
            if(files && (validHtmlElement instanceof HTMLVideoElement || validHtmlElement instanceof HTMLImageElement)) {
                const srcParts = validHtmlElement.src.split('/');
                const shortSrc = srcParts[srcParts.length - 1]
                const previewFile = files.find(file => file.name === shortSrc);

                if(previewFile) reader.readAsDataURL(previewFile);
                const readerCallback = () => {
                    const result = reader.result;
                    if(typeof result === 'string') validHtmlElement.src = result;
                    reader.removeEventListener('load', readerCallback);
                }
                reader.addEventListener("load", readerCallback)   
                
            }
            mainDiv.appendChild(validHtmlElement);
        }

        return mainDiv;
    }

    generateHtmlElement(element: CustomHtmlWithProps): HTMLElement {
        const htmlElementName = element.element;
        if(this.isStaticHtmlElement(element.properties)) {
            const {content, size, align} = element.properties;
            const htmlElement = htmlElementName === 'header' ? document.createElement('h1') : document.createElement('p');
            const latexInjectedContent = katex.renderToString(content.replace(/ /g, '\\ '), {throwOnError: false});

            htmlElement.innerHTML = latexInjectedContent;
            htmlElement.style.fontSize = size !== undefined ? size : '20px';
            htmlElement.style.overflowWrap = 'break-word';
            htmlElement.style.wordBreak = 'break-word';
            if(align) htmlElement.style.textAlign = align;
            return htmlElement;
        } else {
            const {src, width, height, align} = element.properties;
            const htmlElement = htmlElementName === 'video' ? document.createElement('video') as HTMLVideoElement : htmlElementName === 'graph' ? document.createElement('object') as HTMLObjectElement : document.createElement('img') as HTMLImageElement;
            if(htmlElement instanceof HTMLVideoElement || htmlElement instanceof HTMLImageElement) {
                htmlElement.src = src;
                if(htmlElement instanceof HTMLVideoElement) htmlElement.controls = true;
            } else {
                htmlElement.data = src;
            } 
            if(width) htmlElement.style.width = width;
            if(height) htmlElement.style.height = height;
            if(align) htmlElement.style.alignSelf = align;
            return htmlElement;
        }
    }

    isStaticHtmlElement(obj: any): obj is StaticHtmlProperties {
        return 'content' in obj;
    }

    isMediaHtmlElement(obj: any): obj is MediaHtmlProperties {
        return 'src' in obj;
    }

    generateValidObject(text: string): CustomHtmlWithProps[] {
        const htmlObjectsWithProps: CustomHtmlWithProps[] = [];
        const elements = this.resolveInputText(text);
        for(let el of elements) {
            let propsObj = Object.fromEntries(this.extractProperties(el.value).map(obj => [obj.element, obj.value]));
            if(this.isStaticHtmlElement(propsObj) || this.isMediaHtmlElement(propsObj)) {
                htmlObjectsWithProps.push(
                    {
                        element: el.element,
                        properties: propsObj
                    }
                )
            }
        }
        return htmlObjectsWithProps;
    }

    resolveInputText(textFormat: string): ElementValueObj[] {
        let elements = [];
        const regex = /^\/\/(\w+)\{([^{}]*?(?:\{[^{}]*\}[^{}]*)*)\}/gm;
    
        elements = this.applyRegex(regex, textFormat);
        return elements;
    }

    extractProperties(propertiesString: string): ElementValueObj[] {
        const propertiesObj = {};
        const regex = /(\w+):\s*'([^']*)'/g;
        return this.applyRegex(regex, propertiesString);
    }

    applyRegex(regex: RegExp, propsString: string): ElementValueObj[] {
        let match;
        const elements = [];
        while((match = regex.exec(propsString)) !== null) {
            const element = match[1];
            const value = match[2];
            elements.push({element, value})
        }
        return elements;
    }
}
