import './css/styles.scss';
import './css/sidebar.scss';
import { createResizable } from './js/createResizable';
import { Sidebar } from './js/sidebar';
import { ActionsModular } from './js/actionsModular';
import { Move } from './js/move';
import { Resizable } from './js/resizable';
import { Presearch } from './js/presearch';

const body = document.querySelector('body');

const crBoxButton = document.querySelector('.js-create-box-button');
crBoxButton.addEventListener('click', () => {
    const newBox = createResizable();
    body.appendChild(newBox);
});

const sidebar = new Sidebar()
sidebar.run()

const actionsModular = new ActionsModular()
actionsModular.run()

const windowAll = document.querySelectorAll('.js-window');

const move = new Move()
const resizable = new Resizable()
const presearch = new Presearch(startActive)

windowAll.forEach(documentWindow => {
    startActive(documentWindow)
    presearch.action(documentWindow)
});


function startActive(documentWindow) {
    move.run(documentWindow)
    resizable.run(documentWindow)
}
