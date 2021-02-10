import { projectsArray } from './projectsArray.js';
import { toDoList } from './toDoList.js'
import { inputToDo } from './inputToDo.js'

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
        projectsArray[inputToDo.index].completedArray.forEach(item => {
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
            let toDoIndex = projectsArray[inputToDo.index]['completedArray'].findIndex(x => x.title === toDoTitle);
    
            if (target.matches('svg.fa-ban') || cancelDValue === targetDValue) {
                projectsArray[inputToDo.index]['toDoArray'].push(projectsArray[inputToDo.index]['completedArray'][toDoIndex]);
                projectsArray[inputToDo.index]['completedArray'].splice(toDoIndex, 1);
            } 
            renderCompletedArray();
            toDoList.rendertoDoList();
            displayTotal();
        }
    }
    
    function displayTotal() {
        completedTotal.innerText = `Total: ${projectsArray[inputToDo.index]['completedArray'].length}`;
    }
    
    return {
        renderCompletedArray: renderCompletedArray,
        displayTotal: displayTotal
    }
    
})();

export { completedList }