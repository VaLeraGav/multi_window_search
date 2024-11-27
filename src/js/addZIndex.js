
let zIndexMax = 2;

export default function addZIndex(elem) {
    // TODO
    // if (+elem.style.zIndex < zIndexMax - 1) {
    elem.style.zIndex = zIndexMax;
    zIndexMax++;
    // }
}
