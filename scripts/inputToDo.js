import { projectsArray } from './projectsArray.js'
import { toDoList } from './toDoList.js'

// input toDo Module

let inputToDo = (function() {

    // cacheDOM
    let projectName = document.querySelector('#project-name');
    let currentProject = projectName.innerText;
    
    const inputField = document.querySelector('#add-to-do');
    const plusButton = document.querySelector('#plus-button');
    let importantInput = document.querySelector('#important-input');
    
    // public variable
    let index = projectsArray.findIndex(x => x.name === currentProject);
    
    // bind events
    inputField.addEventListener('keydown', addToDo);
    plusButton.addEventListener('click', addToDo);
    importantInput.addEventListener('click', importantInputToggle);
    
    function addToDo(e) {
        if (13 == e.keyCode || e.target.matches('svg.fa-plus') || e.target.matches('path')) {
            let name = inputField.value;
            if (name === '') {
                return;
            } else {
                let dueDate = '';
                let priority = '';
                if (importantInput.classList.contains('important')) {
                    priority = 'important';
    
                } else {
                    priority = 'notImportant';
                }
                let notes = '';
                let newToDo = new toDoFactory(name, dueDate, priority, notes);
                index = projectsArray.findIndex(x => x.name === projectName.innerText);
                
                projectsArray[index]['toDoArray'].push(newToDo);
                toDoList.rendertoDoList();
                inputField.value = '';
                importantInputReset();
            }
        }
    }
    
    function toDoFactory(title, dueDate, priority, notes, steps) {
        return {
            title, dueDate, priority, notes, steps
        }
    };
    
    function importantInputToggle(e) {
        if (e.target.matches('svg.fa-star') || e.target.matches('path')) {
            if (importantInput.classList.contains('not-important')) {
                importantInput.classList.remove('not-important');
                importantInput.classList.add('important');
            } else {
                importantInput.classList.add('not-important');
                importantInput.classList.remove('important');
            }      
        }
    }
    
    function importantInputReset() {
        if (importantInput.classList.contains('not-important')) {
            return
        } else {
            importantInput.classList.add('not-important');
            importantInput.classList.remove('important');
        }
    }
    
    return {
        index: index,
        projectName: projectName
    }    
})();

export { inputToDo } 