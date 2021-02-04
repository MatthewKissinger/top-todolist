// To DO list for the To do app lol
// 1) Update the template to have DOM element variables -- DONE!
//  a) add the class to change the color of the star for the given toDo list's priority -- DONE!
// 2) add a function to toggle the toDo list's priority on the star button -- DONE!
//  a) needs to update the object's priority status in projectsArrays -- DONE!
//  b) delegate this method by using 'closest' method -- research -- DONE!
// 3) create a button on the todo List items that will place them in a completed array for each project


// cacheDOM for the entire App
const projectList = document.querySelector('#project-list-wrapper');
const projectDisplay = document.querySelector('#project-display');
const toDoInfo = document.querySelector('#to-do-info');

// Project Storage

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
        completedArray: []
    }
];


// Project Display Module

// cacheDOM
const projectName = document.querySelector('#project-name');
let currentProject = projectName.innerText;
let index = projectsArray.findIndex(x => x.name === currentProject);

const inputToDo = document.querySelector('#add-to-do');
let plusButton = document.querySelector('#plus-button');
let importantInput = document.querySelector('#important-input');

const toDoContainer = document.querySelector('#to-do-container');

// bind events
inputToDo.addEventListener('keydown', addToDo);
plusButton.addEventListener('click', addToDo);
importantInput.addEventListener('click', importantInputToggle);
toDoContainer.addEventListener('click', toDoImportantToggle);

// render function for the toDo container
renderToDoList();

// render function for toDo lists items
function renderToDoList() {
    toDoContainer.innerHTML = '';
    projectsArray[index].toDoArray.forEach(item => {
        toDoContainer.appendChild(toDoTemplate(item['title'], item['priority']));
    }); 
}

function toDoTemplate(title, priority) {
    let toDoWrapper = document.createElement('div');
    toDoWrapper.classList.add('to-do-wrapper');

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

function toDoImportantToggle(e) {
    const target = e.target;
    if (e.target.matches('svg.fa-star') || e.target.matches('path')) {
        let closest = target.closest('div');
        let toDoTitle = closest.querySelector('.to-do-card').innerText;
        let toDoIndex = projectsArray[index]['toDoArray'].findIndex(x => x.title === toDoTitle);
        let toDoPriority = projectsArray[index]['toDoArray'][toDoIndex]['priority'];
        
        if (toDoPriority === 'important') {
            projectsArray[index]['toDoArray'][toDoIndex]['priority'] = 'notImportant';
        } else if (toDoPriority === 'notImportant') {
            projectsArray[index]['toDoArray'][toDoIndex]['priority'] = 'important';
        }
    }   
    renderToDoList();
}

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
            renderToDoList();
            inputToDo.value = '';
            importantInputReset();
        }
    }
}




