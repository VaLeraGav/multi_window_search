import addZIndex from './addZIndex';

export class Resizable {
    constructor() {
        this.windowActive = null;
        this.direction = '';
        this.minHeight = 107;
        this.minWidth = 330;

        this.handleMouseMove = this.resize.bind(this);
        this.handleMouseUp = this.stopResize.bind(this);
    }

    run(window) {
        this.startEventListener(window);
    }

    startEventListener(window) {
        const resizers = window.querySelectorAll('.js-changing-size div');
        resizers.forEach(resizer => {
            resizer.addEventListener('mousedown', this.initResize.bind(this));
        });
    }

    initResize(e) {
        e.preventDefault();
        this.direction = e.target.classList[0];
        this.windowActive = e.target.closest(".js-window");
        addZIndex(this.windowActive);

        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    resize(e) {
        const rect = this.windowActive.getBoundingClientRect();
        this.resizeElement(e, rect);
    }

    resizeElement(e, rect) {
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;

        if (this.direction.includes('right')) {
            this.resizeRight(e, rect, maxWidth);
        }

        if (this.direction.includes('bottom')) {
            this.resizeBottom(e, rect, maxHeight);
        }

        if (this.direction.includes('top')) {
            this.resizeTop(e, rect);
        }

        if (this.direction.includes('left')) {
            this.resizeLeft(e, rect);
        }
    }

    resizeRight(e, rect, maxWidth) {
        const newWidth = e.clientX - rect.left;
        if (newWidth > this.minWidth && (newWidth + rect.left) < (maxWidth - 3)) {
            this.windowActive.style.width = newWidth + 'px';
        }
    }


    resizeBottom(e, rect, maxHeight) {
        const newHeight = e.clientY - rect.top;
        if (newHeight > this.minHeight && (newHeight + rect.top) < (maxHeight - 3)) {
            this.windowActive.style.height = newHeight + 'px';
        }
    }

    resizeTop(e, rect) {
        const locationPoint = e.clientY - rect.top;
        const newHeight = rect.height - locationPoint;
        const newTop = rect.top + locationPoint;

        if (newHeight > this.minHeight && newTop > 3) {
            this.windowActive.style.height = newHeight + 'px';
            this.windowActive.style.top = newTop + 'px';
        }
    }

    resizeLeft(e, rect) {
        const locationPoint = e.clientX - rect.left;
        const newWidth = rect.width - locationPoint;
        const newLeft = rect.left + locationPoint;

        if (newWidth > this.minWidth && newLeft > 3) {
            this.windowActive.style.width = newWidth + 'px';
            this.windowActive.style.left = newLeft + 'px';
        }
    }

    stopResize() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

}
