// To DO list for the To do app lol

// 1) create a button on the todo List items that will place them in a completed array for each project -- DONE!
//  a) add a delegated event lister to push the toDo item into the completed array -- DONE!
//  b) create a completedArray container below the toDoArray container -- DONE!
//  c) render the completedArray items into the container -- DONE!
// 2) create an event listener on the completed header div,  it will display or hide the completed container when clicked


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

renderCompletedArray();

function renderCompletedArray() {
    completedContainer.innerHTML = '';
    projectsArray[input.index].completedArray.forEach(item => {
        completedContainer.appendChild(template(item['title']));
    }); 
}

function template(title) {
    let wrapper = document.createElement('div');
    wrapper.classList.add('to-do-wrapper');

    let toDoCard = document.createElement('div');
    toDoCard.classList.add('to-do-card');
    toDoCard.innerText = `${title}`;

    wrapper.appendChild(toDoCard);

    return wrapper;
}

return {
    renderCompletedArray: renderCompletedArray
}

})();








