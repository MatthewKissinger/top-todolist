
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
                checklist: "",
                origin: "Default"
            },
            {
                title: "Yoga",
                dueDate: "",
                priority: "notImportant",
                notes: "",
                checklist: "",
                origin: "Default"
            }
        ],
        completedArray: [
            {
                title: "Workout", 
                dueDate: "", 
                priority: "notImportant", 
                notes: "", 
                checklist: "",
                origin: "Default"
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
                checklist: "",
                origin: "Default"
            }
        ],
        completedArray: []
    }
];

function showProjectsArray() {
    console.log(projectsArray);
}

export { projectsArray, showProjectsArray }
