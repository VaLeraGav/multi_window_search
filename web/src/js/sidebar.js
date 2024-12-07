
export class Sidebar {
    constructor() {
        this.sidebarFold = document.querySelector('.js-sidebar-fold');

        this.activeFilesShow = document.querySelector('.js-active-files-show');
        this.activeFiles = document.querySelector('.js-active-files');
        this.startDragover = false;

        this.direction = '';
        this.minHeight = 107;
        this.minWidth = 250;
        this.maxWidth = 750;

        this.left = '-337px';
        this.handleMouseMove = this.resize.bind(this);
        this.handleMouseUp = this.stopResize.bind(this);
    }

    run() {
        if (this.activeFilesShow) {
            this.setupToggle();
            this.setupDragAndDrop();
            this.changeSize();
        }
    }

    setupToggle() {
        this.activeFilesShow.addEventListener('click', () => {
            if (this.activeFiles.style.display === 'none' || this.activeFiles.style.display === '') {
                this.activeFiles.style.display = 'block';
            } else {
                this.activeFiles.style.display = 'none';
            }
        });
    }

    setupDragAndDrop() {
        const activeFilesLi = this.activeFiles.querySelector('.js-active-files-list');
        const activeFilesList = activeFilesLi.querySelectorAll('li');

        let afDelete
        let afTitle
        activeFilesList.forEach(afLi => {
            afTitle = afLi.querySelector('.js-active-files-title');
            afTitle.addEventListener('click', () =>  this.activeFilesShowSection(afLi));

            afDelete = afLi.querySelector('.js-active-files-delete');
            afDelete.addEventListener('click', () => this.activeFilesDelete(afLi));

            afLi.addEventListener('dragstart', (e) => this.handleDragStart(e, afLi));
            afLi.addEventListener('dragend', (e) => this.handleDragEnd(e, afLi));
        });

        activeFilesLi.addEventListener('dragover', (e) => this.initSortableList(e, activeFilesLi));
        activeFilesLi.addEventListener('dragenter', e => e.preventDefault());
    }

    activeFilesShowSection(afLi) {
        // if (this.activeFiles.style.display === 'none' || this.activeFiles.style.display === '') {
        //     this.activeFiles.style.display = 'block';
        // } else {
        //     this.activeFiles.style.display = 'none';
        // }

        // if (afLi.classList.contains('active')) {
        //     afLi.classList.remove('active');
        // } else {
        //     afLi.classList.add('active');
        // }

        console.log('click afLi');
    }

    activeFilesDelete(afLi) {
        console.log('click afDelete');
        afLi.remove()
    }

    handleDragStart(e, afLi) {
        this.startDragover = true;
        setTimeout(() => afLi.classList.add('dragging'), 0);
    }

    handleDragEnd(e, afLi) {
        this.startDragover = false;
        afLi.classList.remove('dragging');
    }

    initSortableList(e, activeFilesLi) {
        if (this.startDragover) {
            e.preventDefault();
            const draggingItem = activeFilesLi.querySelector('.dragging');
            const siblings = [...activeFilesLi.querySelectorAll('li:not(.dragging)')];

            const nextSibling = siblings.find(sibling => {
                return e.clientY < sibling.getBoundingClientRect().top + sibling.offsetHeight / 2;
            });

            activeFilesLi.insertBefore(draggingItem, nextSibling || null);
        }
    }

    changeSize() {
        const changingSizes = this.activeFiles.querySelectorAll('.js-changing-size div');
        changingSizes.forEach(changingSize => {
            changingSize.addEventListener('mousedown', this.initResize.bind(this));
        });
    }

    initResize(e) {
        e.preventDefault();
        this.direction = e.target.classList[0];

        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    resize(e) {
        const rect = this.activeFiles.getBoundingClientRect();
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
            this.activeFiles.style.width = `${newWidth}px`;
            this.left = `-${newWidth}px`;
        }
    }


    resizeBottom(e, rect, maxHeight) {
        const newHeight = e.clientY - rect.top;
        if (newHeight > this.minHeight && (newHeight + rect.top) < maxHeight) {
            this.activeFiles.style.height = newHeight + 'px';
        }
    }


    stopResize() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }
}
