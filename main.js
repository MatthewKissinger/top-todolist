// To DO list for the To do app lol

// 1) add chevrons for expanding or contracting the container -- DONE!
// 2) create an input field in the project list container to add a project to the projects Array
//  a) needs a name, toDoArray, and completedArray
//  b) use a factory function to have this created
//  c) look at the toDo item generator as a template

// cacheDOM for the entire App
const projectList = document.querySelector('#project-list-wrapper');
const projectDisplay = document.querySelector('#project-display');
const toDoInfo = document.querySelector('#to-do-info');

// Project Storage

// default project created for demo, testing, and styling purposes
let projectsArray = [
    {
        name: "Default", 
        toDoArray: [
            {
                title: "Laundry",
                dueDate: "",
                priority: "important",
                notes: "",
                checklist: ""
            },
            {
                title: "Yoga",
                dueDate: "",
                priority: "notImportant",
                notes: "",
                checklist: ""
            }
        ],
        completedArray: [
            {
                title: "Workout", 
                dueDate: "", 
                priority: "notImportant", 
                notes: "", 
                checklist: ""
            }
        ]
    }
];

// input toDo Module

let input = (function() {

// cacheDOM
const projectName = document.querySelector('#project-name');
let currentProject = projectName.innerText;
// public variable
let index = projectsArray.findIndex(x => x.name === currentProject);

const inputToDo = document.querySelector('#add-to-do');
let plusButton = document.querySelector('#plus-button');
let importantInput = document.querySelector('#important-input');

// bind events
inputToDo.addEventListener('keydown', addToDo);
plusButton.addEventListener('click', addToDo);
importantInput.addEventListener('click', importantInputToggle);

function addToDo(e) {
    if (13 == e.keyCode || e.target.matches('svg.fa-plus') || e.target.matches('path')) {
        let name = inputToDo.value;
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
            let checklist = '';
            let newToDo = new toDoFactory(name, dueDate, priority, notes, checklist);
            projectsArray[index]['toDoArray'].push(newToDo);
            toDoList.rendertoDoList();
            inputToDo.value = '';
            importantInputReset();
        }
    }
}

function toDoFactory(title, dueDate, priority, notes, checklist) {
    return {
        title, dueDate, priority, notes, checklist
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
    index: index
}

})();

// toDoList Module -- displays each itme in the toDoArray for for the particular project

let toDoList = (function() {

// cache DOM
const toDoContainer = document.querySelector('#to-do-container');

// bind events
toDoContainer.addEventListener('click', toDoDelegation);

// render function for the toDo container
renderToDoList();

// render function for toDo lists items
function renderToDoList() {
    toDoContainer.innerHTML = '';
    projectsArray[input.index].toDoArray.forEach(item => {
        toDoContainer.appendChild(toDoTemplate(item['title'], item['priority']));
    }); 
}
// card creation for the DOM
function toDoTemplate(title, priority) {
    let toDoWrapper = document.createElement('div');
    toDoWrapper.classList.add('to-do-wrapper', 'card');

    let toDoStar = document.createElement('i');
    toDoStar.classList.add('fas', 'fa-star', 'card-star');
    if (priority === 'notImportant') {
        toDoStar.style.color = 'gray';
    } else {
        toDoStar.style.color = 'orange';
    }

    let toDoCheck = document.createElement('i');
    toDoCheck.classList.add('fas', 'fa-check', 'card-check');

    let toDoCard = document.createElement('div');
    toDoCard.classList.add('to-do-card');
    toDoCard.innerText = `${title}`;

    toDoWrapper.appendChild(toDoStar);
    toDoWrapper.appendChild(toDoCheck);
    toDoWrapper.appendChild(toDoCard);

    return toDoWrapper;
};

// Delegates for the important Star and checkmark Completed icons
function toDoDelegation(e) {
    const target = e.target;
    let targetDValue = target.getAttribute('d');

    let starDValue = 'M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z';
    let checkDValue = 'M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z';
    
    let closest = target.closest('div');
  
    // this first conditional is to eliminate an uncaught type error
    if (closest.querySelector('.to-do-card') === null) {
        return;
    } else {
        let toDoTitle = closest.querySelector('.to-do-card').innerText;
        let toDoIndex = projectsArray[input.index]['toDoArray'].findIndex(x => x.title === toDoTitle);

        // important toggle delegation
        if (target.matches('svg.fa-star') || starDValue === targetDValue ) {
            let toDoPriority = projectsArray[input.index]['toDoArray'][toDoIndex]['priority'];
        
        if (toDoPriority === 'important') {
            projectsArray[input.index]['toDoArray'][toDoIndex]['priority'] = 'notImportant';
        } else if (toDoPriority === 'notImportant') {
            projectsArray[input.index]['toDoArray'][toDoIndex]['priority'] = 'important';
        }
        }   // checkmark to completed Array delegation
            else if (target.matches('svg.fa-check') || checkDValue === targetDValue) {
                projectsArray[input.index]['completedArray'].push(projectsArray[input.index]['toDoArray'][toDoIndex]);
                projectsArray[input.index]['toDoArray'].splice(toDoIndex, 1);
        } 
    renderToDoList();   
    completedList.renderCompletedArray();
    completedList.displayTotal();
    }    
}

return {
    rendertoDoList: renderToDoList,
}

})();


// completed Array module -- render function and toggle incomplete 
let completedList = (function() {

//cache DOM
let completedContainer = document.querySelector('#completed-container');
completedContainer.style.display = 'none';
let completedHeader = document.querySelector('#completed-header');
let completedTotal = document.querySelector('#completed-total');
let expandContainer = document.querySelector('#expand-container');

//bind events
completedHeader.addEventListener('click', displayContainer);
completedContainer.addEventListener('click', cancelComplete);


function displayContainer() {
    if (completedContainer.style.display === 'none') {
        completedContainer.style.display = 'block';
        expandContainer.innerHTML = '<i class="fas fa-chevron-up card-chevron"></i>';
        renderCompletedArray();
    } else {
        completedContainer.style.display = 'none';
        expandContainer.innerHTML = '<i class="fas fa-chevron-down card-chevron"></i>';

    }
}

function renderCompletedArray() {
    completedContainer.innerHTML = '';
    projectsArray[input.index].completedArray.forEach(item => {
        completedContainer.appendChild(template(item['title'], item['priority']));
    }); 
}

function template(title, priority) {
    let wrapper = document.createElement('div');
    wrapper.classList.add('to-do-wrapper', 'card');

    let toDoCard = document.createElement('div');
    toDoCard.classList.add('to-do-card');
    toDoCard.innerText = `${title}`;

    let toDoStar = document.createElement('i');
    toDoStar.classList.add('fas', 'fa-star', 'card-star');
    if (priority === 'notImportant') {
        toDoStar.style.color = 'gray';
    } else {
        toDoStar.style.color = 'orange';
    }

    let cancelComplete = document.createElement('i');
    cancelComplete.classList.add('fas', 'fa-ban', 'card-cancel');

    wrapper.appendChild(toDoCard);
    wrapper.appendChild(toDoStar);
    wrapper.appendChild(cancelComplete);

    return wrapper;
}

function cancelComplete(e) {
    const target = e.target;
    let targetDValue = target.getAttribute('d');
    let cancelDValue = 'M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z';
    let closest = target.closest('div');

    if (closest.querySelector('.to-do-card') === null) {
        return;
    } else {
        let toDoTitle = closest.querySelector('.to-do-card').innerText;
        let toDoIndex = projectsArray[input.index]['completedArray'].findIndex(x => x.title === toDoTitle);

        if (target.matches('svg.fa-ban') || cancelDValue === targetDValue) {
            projectsArray[input.index]['toDoArray'].push(projectsArray[input.index]['completedArray'][toDoIndex]);
            projectsArray[input.index]['completedArray'].splice(toDoIndex, 1);
        } 
        renderCompletedArray();
        toDoList.rendertoDoList();
        displayTotal();
    }
}

function displayTotal() {
    completedTotal.innerText = `Total: ${projectsArray[input.index]['completedArray'].length}`;
}

return {
    renderCompletedArray: renderCompletedArray,
    displayTotal: displayTotal
}

})();








