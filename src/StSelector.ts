import { createElmByHtml } from "./funcs/forDom";
import { stNodeType } from "./vars/stEditorDefaultConfig";

declare namespace StSelector{
   export type Selector = string | StSelector | Element |  HTMLCollection | NodeList;
   
}
export class StSelector{
    protected selector: StSelector.Selector;
    protected length: number = 0;
    constructor(selector?: StSelector.Selector) {
        if (!selector) {
            return ;
        }
        if (selector instanceof StSelector) {
            return selector;
        }      
        this.selector = selector;
        let searchResult = this.getSearchResult(selector);
        let length = searchResult.length;
        if (!length) {
            return this;
        }
        for (let i = 0; i < length; i ++) {
            this[i] = searchResult[i];
        }
        this.length = length;
    }
    private getSearchResult(selector: StSelector.Selector): HTMLCollection |  NodeListOf<Element> | Array<NodeListOf<Element>> | Array<Element> {
        if (typeof selector === "string") {
            return this.getSearchResultOnString(selector);
        }
        let nodeType = (<Element>selector).nodeType;
        if (
            nodeType === stNodeType.documentNode 
            || nodeType === stNodeType.elementNode
        ) {
            return [ <Element>selector ];
        }
        if (
            this.isDomList(<HTMLCollection | NodeList>selector) 
            || selector instanceof Array
        ) {
            return <HTMLCollection |  NodeListOf<Element> | Array<NodeListOf<Element>>>selector;
        }
    }
    private getSearchResultOnString(selector: string): HTMLCollection |  NodeListOf<Element> | Array<NodeListOf<Element>>{
        selector = selector.replace('/\n/mg', '').trim();
        if (selector.indexOf('<') === 0) {
            return this.createElmByHtml(selector);//L 118
        } else {
            return this.querySelectorAll(selector);
        }
    }
    public createElmByHtml(html: string): HTMLCollection {
        let div = document.createElement("div");
        div.innerHTML = html;
        return div.children;
    }
    public isDomList(result?: HTMLCollection | NodeList): boolean {
        if (!result) {
            return false;
        }
        if (result instanceof HTMLCollection || result instanceof NodeList) {
            return true;
        }   
        return false;
    }
    public querySelectorAll(selector: string): NodeListOf<Element> | Array<NodeListOf<Element>>{
        let result = document.querySelectorAll(selector);
        if (this.isDomList(result)) {
            return result;
        }
        return [ result ];
    }
    public forEach(fn: (el: any, elm: any, index: number) => void | false): this {
        let len = this.length;
        for (let i = 0; i < len; i ++) {
            let elm = this[i];
            var result = fn.call(elm, elm, i);
            if (result === false) {
                break;
            }
        }
        return this;
    }
}