
import addZIndex from './addZIndex';

export class ActionsModular {
    constructor() {
        this.windowActive = null;
    }

    run() {
        document.addEventListener('click', (e) => this.handleClick(e));
    }

    handleClick(e) {
        const target = e.target.closest('.js-window');
        if (target) {
            this.windowActive = target;
            addZIndex(this.windowActive);

            if (e.target.closest('.js-action-win')) {
                this.handleAction(e);
            }
        }
    }

    handleAction(e) {
        if (e.target.closest('.js-close')) {
            this.close();
        } else if (e.target.closest('.js-open')) {
            this.open();
        } else if (e.target.closest('.js-delete')) {
            this.delete();
        }
    }

    close() {
        console.log("close");
        // Дополнительная логика закрытия, если необходима
    }

    open() {
        if (this.windowActive) {
            this.windowActive.style.width = '1000px';
            this.windowActive.style.height = '900px';
            addZIndex(this.windowActive);
        }
    }

    delete() {
        if (this.windowActive) {
            this.windowActive.remove();
            this.windowActive = null; // Обнуляем ссылку после удаления
        }
    }
}
