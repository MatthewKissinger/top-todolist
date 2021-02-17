import { toDoList } from './toDoList.js'

// module to display the toDo contents when a toDo Card is selected from the list
// leave it blank by default


let toDoDisplay = (function() {

    // cache DOM
    let toDoTitle = document.querySelector('#to-do-title');
    let stepContainer = document.querySelector('#step-container');
    let addStep = document.querySelector('#add-step');
    let dueDate = document.querySelector("#due-date-wrapper");
    let notesContainer = document.querySelector('#to-do-notes');
    let objectInfo = {};

    // bind events
    stepContainer.addEventListener('click', stepDelegation);

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
            stepUndo.classList.add('fas', 'fa-ban', 'card-cancel');

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

        let closest = target.closest('div');
        let stepTitle = closest.innerText;
        let stepIndex = objectInfo['steps'].findIndex(x => x.name === stepTitle);

        if (target.matches('svg.fa-check') || checkDValue === targetDValue) {
            objectInfo['steps'][stepIndex]['checked'] = true;
        }

        if (target.matches('svg.fa-ban') || cancelDValue === targetDValue) {
            objectInfo['steps'][stepIndex]['checked'] = false;
        }

        renderInfo();
    }

    function dateTemplate() {
        dueDate.innerHTML = '';
        let dateIcon = document.createElement('i');
        dateIcon.classList.add('fas', 'fa-calendar-alt');

        let dateInfo = document.createElement('div');
        if (objectInfo['dueDate'] === '') {
            dateInfo.innerText = `add a due date`;
        }
        dueDate.appendChild(dateIcon);
        dueDate.appendChild(dateInfo);
    }

    function notesTemplate() {
        notesContainer.innerText = objectInfo['notes'];
    }

return {
    renderInfo: renderInfo,
    objectInfo: objectInfo
}

})();

export { toDoDisplay }