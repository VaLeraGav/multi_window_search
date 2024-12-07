export function drawPoint(x, y) {
    const point = document.createElement('div');
    point.className = 'point';
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
    document.body.appendChild(point);
}
