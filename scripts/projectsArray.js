
// default project created for demo, testing, and styling purposes
let projectsArray = [
    {
        name: "Default", 
        toDoArray: [
            {
                title: "Laundry",
                dueDate: "",
                priority: "important",
                notes: `Don't use bleach`,
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

function showProjectsArray() {
    console.log(projectsArray);
}

export { projectsArray, showProjectsArray }
