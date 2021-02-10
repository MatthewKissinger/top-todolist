// To DO list for the To do app lol

// 1) scrap important project and all logic associated with it -- DONE!
// 2) setup ES6 modules -- DONE!
// 3) push changes to gitHub
// 4) give the project cards a delete button
// 5) setup the rightside of the app - this will display the toDo items info when selected by a delegation

import { projectsArray, showProjectsArray } from './projectsArray.js'
import { completedList } from './completed.js'
import { toDoList } from './toDoList.js'
import { inputToDo } from './inputToDo.js'

// cacheDOM for the entire App
const projectDisplay = document.querySelector('#project-display');
const toDoInfo = document.querySelector('#to-do-info');

// project list Module
let projects = (function() {

// cache DOM
const projectList = document.querySelector('#project-list-wrapper');
const _inputField = document.querySelector('#add-project');
const _plusButton = document.querySelector('#project-plus-button');

// bind events
projectList.addEventListener('click', displayProject);
_inputField.addEventListener('keydown', addProject);
_plusButton.addEventListener('click', addProject);


renderProjectList();

// render projects function
function renderProjectList() {
    projectList.innerHTML = '';
    projectsArray.forEach(project => {
        projectList.appendChild(template(project['name']));
    })
};

// template for rendering project card
function template(name) {
    let projectCard = document.createElement('div');
    projectCard.classList.add('project-name-card', 'card');
    projectCard.innerText = `${name}`;
    
    return projectCard;
};

function displayProject(e) {
    let target = e.target;
    if (target.matches('div.project-name-card')) {
        inputToDo.projectName.innerText = target.innerText;
        inputToDo.index = projectsArray.findIndex(x => x.name === target.innerText);
        toDoList.rendertoDoList();
        completedList.renderCompletedArray();
        completedList.displayTotal();
        // showProjectsArray();
    }
}

function addProject(e) {
    let keyCode = e.keycode ? e.keyCode : e.which;
    if ( 13 == keyCode || e.target.matches('svg.fa-plus') || e.target.matches('path')) {
        let name = _inputField.value;
        if (name === '') {
            return;
        } else {
            let toDoArray = [];
            let completedArray = [];
            let newProject = new projectFactory(name, toDoArray, completedArray);
            projectsArray.push(newProject);
            renderProjectList();
            _inputField.value = '';
        }
    }
}

function projectFactory(name, toDoArray, completedArray) {
    return {
        name, toDoArray, completedArray
    }
};

})();

export { projects }

