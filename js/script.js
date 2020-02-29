const todoList = document.querySelector('.todo-container');
const todoInput = document.querySelector('#todo-input')
const todoBtn = document.querySelector('.todo-add')

const list = [
    {
        name: 'Buy Milk',
        status: 'done'
    },
    {
        name: 'Get Toalet Paper',
        status: ''
    }
]


// Create Template Function
const todoTmpl = ( id, title, status = '' ) => {
    return html = `
        <div data-id="${id}" class="todo-item ${status}" draggable="true">
            
            <h2>${title}</h2>
            <span class="close">✕</span>

        </div>

    `;
}

// Create Factory Function
const todoFactory = (todoz) => {
    clear()
    let counter = 0;
    todoz.forEach( (data) => {
        // console.log(data)
        todoList.innerHTML += todoTmpl( counter, data.name, data.status)
        counter++;
    })
    Dragging();
    checkListener();
    removeListener();
}

const addTodo = (name) => {
    list.push({ name, status: '' });
}

const clear = () => {
    todoList.innerHTML = ''
}

const removeListener = () => {
    let items = document.querySelectorAll('.close')
    items.forEach( (item) => {
        item.addEventListener('click', function() {
            this.parentNode.classList.add('remove')
            setTimeout( () => {
                this.parentNode.remove()
                list.splice( this.parentNode.dataset.id, 1);

                todoFactory(list)
            }, 200)

        })
    })
}

const checkListener = () => {
    let items = document.querySelectorAll('.todo-item h2');
    items.forEach( (item) => {
        item.addEventListener('click', function() {
            // toggle .done on .todo-item
            this.parentNode.classList.contains('done') ? this.parentNode.classList.remove('done') : this.parentNode.classList.add('done')
            // toggle status in the list obj
            list[this.parentNode.dataset.id].status == 'done' ? list[this.parentNode.dataset.id].status = '' : list[this.parentNode.dataset.id].status = 'done'
        })
    })
}



// Function for adding event listeners on todo-item
todoBtn.addEventListener('click', function() {
    todoInput.value !== '' ? addTodo(todoInput.value) : false;
    todoFactory(list)
    todoInput.value = ''
})


// Drag and Drop
const Dragging = () => {

    let dropList = document.querySelectorAll('.todo-item');
    console.log(dropList);

    let draggedItem = '';

    for( let d = 0; d < dropList.length; d++ ) {

        const item = dropList[d];

        // dragstart
        item.addEventListener('dragstart', function(e) {
            draggedItem = this
            console.log(draggedItem)

            setTimeout( function() {
                item.style.opacity = 0
            }, 0 )
        })

        // dragend
        item.addEventListener('dragend', function() {
            
            setTimeout( function() {
                draggedItem.style.opacity = 1
                draggedItem = ''
            }, 0)
        })

    }

    todoList.addEventListener('dragover', function(e) {
        e.preventDefault()
        console.log('dragover')
    })
    todoList.addEventListener('dragenter', function(e) {
        e.preventDefault()
        console.log('dragenter')
    })
    todoList.addEventListener('dragleave', function(e) {
        //...
        e.preventDefault()
        console.log('dragleave')
    })
    todoList.addEventListener('drop', function(e) {
        console.log(this)
        this.append(draggedItem)
    })
}




todoFactory(list)