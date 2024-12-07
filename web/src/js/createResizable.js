export function createResizable() {
    const newBox = document.createElement('div');
    newBox.className = 'resizable js-resizable';
    newBox.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    newBox.style.top = Math.random() * (window.innerHeight - 100) + 'px';
    newBox.insertAdjacentHTML('afterbegin', ``);
    return newBox;
}
