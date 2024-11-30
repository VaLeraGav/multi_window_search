import addZIndex from './addZIndex';

export class Move {
    constructor() {
        this.isDragging = false;
        this.windowActive = null;
        this.offset = {};
        this.presearchWrap = null;
    }

    run(documentWindow) {
        let draggable = documentWindow.querySelector('.js-draggableMousemove');

        if (draggable) {
            draggable.addEventListener('mousedown', (e) => {
                this.windowActive = e.target.closest(".js-window");
                addZIndex(this.windowActive);

                this.draggableMousemove(e);

                // windowActive = draggableM.closest(".js-window");
                // draggableMousemoveTo2Click(draggableM, windowActive);
            });

            draggable.addEventListener("dblclick", (event) => {
                this.dblclickHeader();
            });
        }
    }

    dblclickHeader() {
        const range = document.createRange();
        range.selectNodeContents(draggable);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    draggableMousemove(e) {
        this.isDragging = true;

        this.offset = {
            x: e.clientX - this.windowActive.getBoundingClientRect().left,
            y: e.clientY - this.windowActive.getBoundingClientRect().top
        };

        const moveHandler = (e) => this.moveButton(e);

        window.addEventListener('mousemove', moveHandler);

        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', moveHandler);
            this.isDragging = false;
        }, { once: true }); // Используем { once: true }, чтобы удалить обработчик после первого вызова
    }

    moveButton(e) {
        if (this.isDragging) {
            const mouseXOffset = e.clientX - this.offset.x;
            const mouseYOffset = e.clientY - this.offset.y;

            // TODO: нужно сделать чтобы было относительно header а не всего блока,
            // чтобы можно прятать пож экран только контент а заголовком можно будет доставать
            const viewportWidth = window.innerWidth - this.windowActive.offsetWidth + 230;
            const viewportHeight = window.innerHeight - this.windowActive.offsetHeight + 100;

            // Ограничиваем движение курсора в пределах окна
            const newX = Math.max(0, Math.min(viewportWidth, mouseXOffset));
            const newY = Math.max(0, Math.min(viewportHeight, mouseYOffset));

            this.windowActive.style.left = newX + 'px';
            this.windowActive.style.top = newY + 'px';
        }
    }

    // не рабочий вариант
    // draggableMousemoveTo2Click(draggableElem, windowActive) {
    //     draggableElem.addEventListener('click', () => {
    //         clickCount++;
    //         if (clickCount === 2) {
    //             isDragging = true;
    //         }
    //     });

    //     draggableElem.addEventListener('mousedown', (e) => {
    //         if (isDragging) {
    //             offsetX = e.clientX - windowActive.getBoundingClientRect().left;
    //             offsetY = e.clientY - windowActive.getBoundingClientRect().top;
    //             document.addEventListener('mousemove', moveButton);
    //         }
    //     });

    //     document.addEventListener('mouseup', () => {
    //         document.removeEventListener('mousemove', moveButton);
    //         if (isDragging) {
    //             isDragging = false;
    //             clickCount = 0;
    //         }
    //     });

    //     function moveButton(e) {
    //         if (isDragging) {
    //             const newX = Math.max(0, Math.min(window.innerWidth - windowActive.offsetWidth, e.clientX - offsetX));
    //             const newY = offsetY; Math.max(0, Math.min(window.innerHeight - windowActive.offsetHeight, e.clientY - offsetY));

    //             windowActive.style.left = newX + 'px';
    //             windowActive.style.top = newY + 'px';
    //         }
    //     }
    // }
}
