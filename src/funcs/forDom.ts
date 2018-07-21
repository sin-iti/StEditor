export function createElmByHtml(html): HTMLCollection {
    let div = document.createElement("div");
    div.innerHTML = html;
    return div.children;
}