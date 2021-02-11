// To DO list for the To do app lol

// 1) give the project cards a delete button -- DONE!
// 2) setup the rightside of the app - this will display the toDo items info when selected by a delegation
//  a) do a mock setup in HTML to style accordingly

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
projectList.addEventListener('click', projectDelegation);
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
    let projectDelete = document.createElement('i');
    projectDelete.classList.add('fas', 'fa-trash-alt', 'project-delete');

    projectCard.classList.add('project-name-card', 'card');
    projectCard.innerText = `${name}`;
    projectCard.appendChild(projectDelete);
    
    return projectCard;
};

function projectDelegation(e) {
    let target = e.target;
    let targetDValue = target.getAttribute('d');
    let deleteDValue = 'M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z';

    if (target.matches('svg.fa-trash-alt') || deleteDValue === targetDValue) {
        if (confirm('Are you sure you want to delete this project?')) {
            let closest = target.closest('div');
            let projectIndex = projectsArray.findIndex(x => x.name === closest.innerText);
            projectsArray.splice(projectIndex, 1);
            renderProjectList();
            // auto displays the default project 
            inputToDo.projectName.innerText = projectsArray[0]['name'];
            inputToDo.index = 0;
            toDoList.rendertoDoList();
            completedList.renderCompletedArray();
            completedList.displayTotal();
        } else {
            console.log('no worries');
        }
        
    } else if (target.matches('div.project-name-card')) {
        inputToDo.projectName.innerText = target.innerText;
        inputToDo.index = projectsArray.findIndex(x => x.name === target.innerText);
        toDoList.rendertoDoList();
        completedList.renderCompletedArray();
        completedList.displayTotal();
        showProjectsArray();
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

