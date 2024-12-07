import addZIndex from './addZIndex';

export class Presearch {
    constructor(startActive) {
        this.startActive = startActive;

        this.bodyArea = document.querySelector('.js-canvas-section');
        this.mouseXOffset = null;

        this.startEventListener();
    }

    startEventListener() {
        this.bodyArea.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        this.bodyArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData('text/plain');
            const draggingTask = document.getElementById(taskId);

            if (draggingTask) {
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                let draggableNew = this.getNodaNewDraggable(`<h1>Компактные структуры данных</h1>
            Компактные структуры данных – это эффективные решения для обработки больших объемов данных с
            минимальным использованием памяти. Они позволяют выполнять такие задачи, как фильтрация, поиск и хранение, с
            меньшими затратами ресурсов, что особенно полезно в Golang,`, ` /mnt/c/Users/Ucer/Desktop/psn/droup`, mouseX, mouseY);

                this.bodyArea.appendChild(draggableNew);

                this.startActive(draggableNew);
            }
        });

    }

    getNodaNewDraggable(content, title, left, top) {
        const createDraggable = document.createElement("div");

        createDraggable.innerHTML = this.createDraggableWindow(content, title, left, top);

        return createDraggable.firstElementChild;
    }


    action(documentWindow) {
        let presearchWrap = documentWindow.querySelector('.js-presearch');
        if (!presearchWrap) {
            return;
        }

        let suggests = presearchWrap.querySelectorAll('.js-presearch-item');
        suggests.forEach((suggest) => {
            suggest.addEventListener('dragstart', (e) => {
                this.mouseXOffset = e.pageX - Math.round(e.target.getBoundingClientRect().left);

                e.dataTransfer.setData('text/plain', suggest.id);
                suggest.classList.add('dragging');
                console.log(e.target);
            });

            suggest.addEventListener('dragend', (e) => {
                suggest.classList.remove('dragging');
            });
        });
    }

    createDraggableWindow(content, title, left, top) {
        return `
        <div class="resizable js-window" style="z-index: 4; left: ${left - this.mouseXOffset}px; top: ${top}px; width: 500px; height: 400px;">
            <div class="header">
                <div class="draggab js-draggableMousemove" title="${title}">${title}</div>
                <div class="action js-action-win">
                    <i class="icon icon-window-minimize js-clone"></i>
                    <i class="icon icon-window-maximize js-open"></i>
                    <i class="icon icon-window-close js-delete"></i>
                </div>
            </div>

            <div class="resizable-body">
                <div class="ps-overflow">
                    <div class="resizable-content">
                        ${content}
                    </div>
                </div>
            </div>

            <div class="changing-size js-changing-size">
                <div class="top-left"></div>
                <div class="top-right"></div>
                <div class="bottom-left"></div>
                <div class="bottom-right"></div>
                <div class="top"></div>
                <div class="bottom"></div>
                <div class="left"></div>
                <div class="right"></div>
            </div>

        </div>`;
    }
}
