import { toDoList } from './toDoList.js'
import { projectsArray, showProjectsArray } from './projectsArray.js'
import { inputToDo } from './inputToDo.js'

// module to display the toDo contents when a toDo Card is selected from the list
// leave it blank by default


let toDoDisplay = (function() {

    // cache DOM
    let toDoTitle = document.querySelector('#to-do-title');
    let stepContainer = document.querySelector('#step-container');
    let addStep = document.querySelector('#add-step');
    let stepPlusButton = document.querySelector('#step-plus-button');
    let dueDate = document.querySelector("#due-date-wrapper");
    const datePicker = document.querySelector("#date-picker");
    let dueDateInput = document.querySelector('#due-date');
    let dueDateButton = document.querySelector('#due-date-btn');
    let notesContainer = document.querySelector('#to-do-notes');
    let objectInfo = {};

    // bind events
    stepContainer.addEventListener('click', stepDelegation);
    addStep.addEventListener('keydown', addNewStep);
    stepPlusButton.addEventListener('click', addNewStep);
    dueDate.addEventListener('click', datePickerDisplay);
    document.addEventListener('mouseup', datePickerHide);
    dueDateButton.addEventListener('click', updateDate);
    notesContainer.addEventListener('blur', updateNotes);

    function renderInfo() {
        titleTemplate();
        stepContainer.innerHTML = '';
        objectInfo['steps'].forEach(step =>  {
            stepContainer.appendChild(stepTemplate(step.name, step.checked));
        });
        dateTemplate();
        notesTemplate();
    }

    function titleTemplate() {
        toDoTitle.innerText = `${objectInfo['title']}`;
    }

    function stepTemplate(stepName, checkedValue) {
        let stepCard = document.createElement('div');
        stepCard.classList.add('step-card');
        stepCard.innerText = `${stepName}`;

        if (checkedValue === true) {
            let stepUndo = document.createElement('i');
            stepUndo.classList.add('fas', 'fa-ban', 'card-cancel', 'step-cancel');

            stepCard.appendChild(stepUndo);
            stepCard.style.textDecoration = 'line-through';
            stepCard.style.color = 'gray';
        } else {
            let stepCheck = document.createElement('i');
            stepCheck.classList.add('fas', 'fa-check', 'card-check', 'step-check');
            stepCard.appendChild(stepCheck);
        }

        let stepDelete = document.createElement('i');
        stepDelete.classList.add('fas', 'fa-trash-alt', 'project-delete', 'step-delete');

        stepCard.appendChild(stepDelete);

        return stepCard;
    }

    function stepDelegation(e) {
        const target = e.target;
        let targetDValue = target.getAttribute('d');
        let checkDValue = 'M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z';
        let cancelDValue = 'M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z';
        let deleteDValue = 'M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z';

        let closest = target.closest('div');
        let stepTitle = closest.innerText;
        let stepIndex = objectInfo['steps'].findIndex(x => x.name === stepTitle);

        if (target.matches('svg.fa-check') || checkDValue === targetDValue) {
            objectInfo['steps'][stepIndex]['checked'] = true;
        }

        if (target.matches('svg.fa-ban') || cancelDValue === targetDValue) {
            objectInfo['steps'][stepIndex]['checked'] = false;
        }

        if (target.matches('svg.fa-trash-alt') || deleteDValue === targetDValue) {
            if (confirm('Are you sure you want to delete this step?')) {
                objectInfo['steps'].splice(stepIndex, 1);
            } else {
                return;
            }
        }

        renderInfo();
    }

    function addNewStep(e) {
        let keyCode = e.keycode ? e.keyCode : e.which;
        if ( 13 == keyCode || e.target.matches('svg.fa-plus') || e.target.matches('path')) {
            let name = addStep.value;
            if (name === '') {
                return;
            } else {
                let checkedValue = false;
                let newStep = new stepFactory(name, checkedValue);
                objectInfo['steps'].push(newStep);
                renderInfo();
                addStep.value = '';
            }
        }
    }

    function stepFactory(name, checkedValue) {
        return {
            name, checkedValue
        }
    }

    function dateTemplate() {
        dueDate.innerHTML = '';
        let dateIcon = document.createElement('i');
        dateIcon.classList.add('fas', 'fa-calendar-alt');

        let dateInfo = document.createElement('div');
        dateInfo.classList.add('date-display');
        if (objectInfo['dueDate'] === '') {
            dateInfo.innerText = `add a due date`;
        } else {
            dateInfo.innerText = objectInfo['dueDate'];
        }
        dueDate.appendChild(dateIcon);
        dueDate.appendChild(dateInfo);
    }

    function datePickerDisplay() {
        const pickerStyles = getComputedStyle(datePicker);
        
        if (pickerStyles.display === 'none') {
            datePicker.style.display = 'flex';
        }

        dueDateInput.value = objectInfo['dueDate'];
    }

    function datePickerHide(e) {
        var container = document.querySelector('#date-picker');
        if (!container.contains(e.target)) {
          container.style.display = 'none';
        }
    }

    function updateDate() {
        let index = projectsArray[inputToDo.index]['toDoArray'].findIndex(x => x.title === objectInfo['title']);
        projectsArray[inputToDo.index]['toDoArray'][index]['dueDate'] = dueDateInput.value;
        let dateDisplay = document.getElementsByClassName('date-display');
        if (dueDateInput.value !== '') {
            dateDisplay[0].innerText = dueDateInput.value;
        }
        
        datePicker.style.display = 'none';
    }
        
    function notesTemplate() {
        notesContainer.value = '';
        notesContainer.value = objectInfo.notes;
    }

    function updateNotes() {
        let index = projectsArray[inputToDo.index]['toDoArray'].findIndex(x => x.title === objectInfo['title']);
        projectsArray[inputToDo.index]['toDoArray'][index]['notes'] = notesContainer.value;
        
    }

return {
    renderInfo: renderInfo,
    datePickerHide: datePickerHide,
    objectInfo: objectInfo
}

})();

export { toDoDisplay }