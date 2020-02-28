const todoList = document.querySelector('.todo-container');
const todoInput = document.querySelector('#todo-input')
const todoBtn = document.querySelector('.todo-add')

const list = [
    {
        name: 'Buy Milk'
    },
    {
        name: 'Get Toalet Paper'
    }
]


// Create Template Function
const todoTmpl = ( id, title ) => {
    return html = `
        <div class="todo-item">
            ${title}<span data-id="${id}" class="close">✕</span>
        </div>

    `;
}

// Create Factory Function
const todoFactory = (todoz) => {
    clear()
    let counter = 0;
    todoz.forEach( (data) => {
        // console.log(data)
        todoList.innerHTML += todoTmpl( counter, data.name)
        counter++;
    })
    removeListener();
}

const addTodo = (name) => {
    list.push({ name });
}

const clear = () => {
    todoList.innerHTML = ''
}

const removeListener = () => {
    let items = document.querySelectorAll('.close')
    items.forEach( (item) => {
        item.addEventListener('click', function() {
            this.parentNode.remove()
            list.splice( this.dataset.id, 1);

            todoFactory(list)
        })
    })
}

// Function for adding event listeners on todo-item
todoBtn.addEventListener('click', function() {
    todoInput.value !== '' ? addTodo(todoInput.value) : false;
    todoFactory(list)
    todoInput.value = ''
})

todoFactory(list)