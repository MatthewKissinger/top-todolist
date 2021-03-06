
import { projectsArray, setLocalStorage } from './arrayStorage.js'
import { inputToDo } from './inputToDo.js'
import { completedList } from './completed.js'
import { toDoDisplay } from './toDoDisplay.js'

// toDoList Module -- displays each itme in the toDoArray for for the particular project

let toDoList = (function() {

    // cache DOM
    const toDoContainer = document.querySelector('#to-do-container');
    const toDoInfoContainer = document.querySelector('#to-do-display');
    
    // bind events
    toDoContainer.addEventListener('click', toDoDelegation);
    
    renderToDoList();

    function renderToDoList() {
        toDoContainer.innerHTML = '';
        projectsArray[inputToDo.index].toDoArray.forEach(item => {
            toDoContainer.appendChild(toDoTemplate(item['title'], item['priority']));
        }); 
        setLocalStorage();
    }
    
    function toDoTemplate(title, priority) {
        let toDoWrapper = document.createElement('div');
        toDoWrapper.classList.add('to-do-wrapper', 'card');
        toDoWrapper.innerText = `${title}`;
    
        let toDoStar = document.createElement('i');
        toDoStar.classList.add('fas', 'fa-star', 'card-star');
        if (priority === 'notImportant') {
            toDoStar.style.color = 'gray';
        } else {
            toDoStar.style.color = 'orange';
        }
    
        let toDoCheck = document.createElement('i');
        toDoCheck.classList.add('fas', 'fa-check', 'card-check')
    
        toDoWrapper.appendChild(toDoStar);
        toDoWrapper.appendChild(toDoCheck);
    
        return toDoWrapper;
    };
    
    // Delegates for the important Star and checkmark Completed icons
    function toDoDelegation(e) {
        const target = e.target;
        let targetDValue = target.getAttribute('d');
    
        let starDValue = 'M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z';
        let checkDValue = 'M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z';
        
        let closest = target.closest('div');
        let toDoTitle = closest.innerText;
        let toDoIndex = projectsArray[inputToDo.index]['toDoArray'].findIndex(x => x.title === toDoTitle);
        let toDoObject = projectsArray[inputToDo.index]['toDoArray'][toDoIndex];

        // display toDoCard info to the right
        if (target.matches('div.to-do-wrapper')) {
            // display the toDoInfoContainer
            toDoInfoDisplay();
            // empty objectInfo
            for (var prop in toDoDisplay.objectInfo) delete toDoDisplay.objectInfo[prop];
            // render function from the toDoDisplay
            toDoDisplay.objectInfo = Object.assign(toDoDisplay.objectInfo, toDoObject);
            toDoDisplay.renderInfo();
        } 

        // important toggle delegation
        if (target.matches('svg.fa-star') || starDValue === targetDValue ) {
            let toDoPriority = toDoObject['priority'];
            
        if (toDoPriority === 'important') {
            toDoObject['priority'] = 'notImportant';
        } else if (toDoPriority === 'notImportant') {
            toDoObject['priority'] = 'important';
        }
        }   // checkmark to completed Array delegation
            else if (target.matches('svg.fa-check') || checkDValue === targetDValue) {
                toDoInfoHide();
                projectsArray[inputToDo.index]['completedArray'].push(projectsArray[inputToDo.index]['toDoArray'][toDoIndex]);
                projectsArray[inputToDo.index]['toDoArray'].splice(toDoIndex, 1);    
        }   
        
        renderToDoList();   
        completedList.renderCompletedArray();
        completedList.displayTotal();
        return toDoIndex;
    }

    function toDoInfoDisplay() {
        const infoStyles = getComputedStyle(toDoInfoContainer);

        if (infoStyles.display === 'none') {
            toDoInfoContainer.style.display = 'block';
        }      
    }

    function toDoInfoHide() {
        const infoStyles = getComputedStyle(toDoInfoContainer);
    
        if (infoStyles.display === 'block') {
            toDoInfoContainer.style.display = 'none';
        }  
    }
    
    return {
        rendertoDoList: renderToDoList,
    }
})();

export { toDoList }