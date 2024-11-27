export class Sidebar {
    constructor() {
        this.sidebarFold = document.querySelector('.js-sidebar-fold');
        this.sidebarToggle = document.querySelector('.js-sidebar-toggle');
        this.startDragover = false;

        this.direction = '';
        this.minHeight = 107;
        this.minWidth = 330;
        this.maxWidth = 750;

        this.left = '-337px';
        this.handleMouseMove = this.resize.bind(this);
        this.handleMouseUp = this.stopResize.bind(this);
    }

    run() {
        this.setupToggle();
        this.setupDragAndDrop();
        this.changeWidth();
    }

    setupToggle() {
        this.sidebarToggle.addEventListener('click', () => {
            this.sidebarFold.classList.toggle('active');



            if (this.sidebarFold.style.left === '0px') {
                this.sidebarFold.style.left = this.left ;
            } else {
                this.sidebarFold.style.left = '0px';
            }
        });
    }

    setupDragAndDrop() {
        const sidebarLi = this.sidebarFold.querySelector('.js-sidebar-li');
        const sidebarLiList = sidebarLi.querySelectorAll('li');

        sidebarLiList.forEach(sdLi => {
            sdLi.addEventListener('click', () => {
                console.log('Происходит всплывание или создание блока, который был скрыт.');
            });

            sdLi.addEventListener('dragstart', (e) => this.handleDragStart(e, sdLi));
            sdLi.addEventListener('dragend', (e) => this.handleDragEnd(e, sdLi));
        });

        sidebarLi.addEventListener('dragover', (e) => this.initSortableList(e, sidebarLi));
        sidebarLi.addEventListener('dragenter', e => e.preventDefault());
    }

    handleDragStart(e, sdLi) {
        this.startDragover = true;
        setTimeout(() => sdLi.classList.add('dragging'), 0);
    }

    handleDragEnd(e, sdLi) {
        this.startDragover = false;
        sdLi.classList.remove('dragging');
    }

    initSortableList(e, sidebarLi) {
        if (this.startDragover) {
            e.preventDefault();
            const draggingItem = sidebarLi.querySelector('.dragging');
            const siblings = [...sidebarLi.querySelectorAll('li:not(.dragging)')];

            const nextSibling = siblings.find(sibling => {
                return e.clientY < sibling.getBoundingClientRect().top + sibling.offsetHeight / 2;
            });

            sidebarLi.insertBefore(draggingItem, nextSibling || null);
        }
    }

    changeWidth() {
        const changingSides = this.sidebarFold.querySelectorAll('.js-sidebar-changing-size div');
        changingSides.forEach(changingSide => {
            changingSide.addEventListener('mousedown', this.initResize.bind(this));
        });
    }

    initResize(e) {
        e.preventDefault();
        this.direction = e.target.classList[0];

        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    resize(e) {
        const rect = this.sidebarFold.getBoundingClientRect();
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
    }

    resizeRight(e, rect, maxWidth) {
        let  newWidth = e.clientX - rect.left;

        if (newWidth > this.minWidth && (newWidth + rect.left) < maxWidth  && this.maxWidth > newWidth) {
            // погрешность на кнопку
            this.sidebarFold.style.width = `${newWidth + 23}px`;
            this.left = `-${newWidth}px`;
        }
    }


    resizeBottom(e, rect, maxHeight) {
        const newHeight = e.clientY - rect.top;
        if (newHeight > this.minHeight && (newHeight + rect.top) < maxHeight) {
            this.sidebarFold.style.height = newHeight + 'px';
        }
    }


    stopResize() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }
}
