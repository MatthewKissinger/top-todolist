
// default project created for demo, testing, and styling purposes
let _projectsArray = [
    {
        name: "Default", 
        toDoArray: [
            {
                title: "Laundry",
                dueDate: "Sat, 6 Mar 2021",
                priority: "important",
                notes: "",
                steps: [
                    {
                        name: "Whites",
                        checked: true
                    },
                    {
                        name: "Brights",
                        checked: false
                    }
                ],
                
            },
            {
                title: "Yoga",
                dueDate: "",
                priority: "notImportant",
                notes: "",
                steps: [], 
            }
        ],
        completedArray: [
            {
                title: "Workout", 
                dueDate: "", 
                priority: "notImportant", 
                notes: "", 
                steps: [],
            }
        ]
    },
    {
        name: "The Odin Project",
        toDoArray: [
            {
                title: "Finish ToDoList App", 
                dueDate: "", 
                priority: "important", 
                notes: "", 
                steps: [],
            }
        ],
        completedArray: []
    }
];

if (localStorage['mattToDoArray'] === undefined) {
    console.log('empty');
    localStorage.setItem('mattToDoArray', JSON.stringify(_projectsArray));
} 

let projectsArray = JSON.parse(localStorage.getItem('mattToDoArray'));
console.log(localStorage);

localStorage.setItem('mattToDoArray', JSON.stringify(projectsArray));

function setLocalStorage() {
    localStorage.setItem('mattToDoArray', JSON.stringify(projectsArray));
}

function showProjectsArray() {
    console.log(projectsArray);
}

export { projectsArray, setLocalStorage, showProjectsArray }
