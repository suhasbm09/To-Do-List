document.addEventListener("DOMContentLoaded",()=>{
    const TodoInput=document.getElementById("to-do-input")
    const button=document.getElementById("add-task-btn")
    const listItem=document.getElementById("to-do-list")

    let todoList=JSON.parse(localStorage.getItem("todolist")) || []

    todoList.forEach(t=>render(t))

//adding a new task
button.addEventListener('click',()=>{
    const data=TodoInput.value.trim()
    if(data==="") return;
    
    let newTask={ //creating a new object to store the data
        id:Date.now(),
        task:data,
        completed:false
    }
    todoList.push(newTask)//pushing the new object to the array
    saveTask()
    render(newTask)
    TodoInput.value=""
})

//rendering the data to the DOM
function render(tasks){
    const list=document.createElement('li')
    if(!tasks || !tasks.id) return;
    list.setAttribute('to-do',tasks.id)
    if(tasks.completed) list.classList.add('completed')
    list.innerHTML=`<span>${tasks.task}</span> <button>Delete</button>`

    list.addEventListener('click',(e)=>{
        if(e.target.tagName ==='BUTTON') return;
        tasks.completed=!tasks.completed
        list.classList.toggle('completed')
        saveTask()
    })
    list.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation()
        if(!todoList) return;
        todoList=todoList.filter(t=>t.id !==tasks.id)
        list.remove()
        saveTask()
    })
    listItem.appendChild(list)

}

//storing on local storage api
function saveTask(){
    localStorage.setItem("todolist",JSON.stringify(todoList))
}
})