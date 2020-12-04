import contractDetails from './../configs/contractDetails'
import visibility from './../configs/visibility'

const initState = {
    client: null,
    contractDetails,
    visibility: visibility.ALL,
    todos: []
}

const rootReducer = (state = initState, action) => {
    if(action.type === 'ADD_TODO') {
        return {
            ...state,
            todos: [
                ...state.todos, {
                id: action.todo.id,
                title: action.todo.title,
                isCompleted: visibility.ACTIVE,
                editable: false,
                editedTitle: ''
            }]
        }
    } else if(action.type === 'ADD_MANY_TODOS') {
        if (action.todos.length === 0) {
            return state;
        }

        return {
            ...state,
            todos: [
                ...state.todos, 
                ...action.todos
            ]
        }
    } else if (action.type === 'SET_CLIENT') {
        return {
            ...state,
            client: action.client
        }
    } else if (action.type === 'CHANGE_TODO_STATE') {

        state.todos.map(todo => {
            if(todo.id === action.todo.id) {
                todo.isCompleted = action.todo.isCompleted;
            }
        })

        return {
            ...state,
            todos: [ ...state.todos ]
        }
    } else if (action.type === 'SET_EDITABLE_TITLE') {

        state.todos.map(todo => {
            if(todo.id === action.todo.id) {
                todo.editable = action.todo.isEditable;
                if(action.todo.isEditable){
                    todo.editedTitle = action.todo.title;
                } else {
                    todo.title = action.todo.title;
                    todo.editedTitle = ''
                }
            }
        })

        return {
            ...state,
            todos: [ ...state.todos ]
        }
    } else if (action.type === 'DISCARD_TITLE_CHANGES') {

        state.todos.map(todo => {
            if(todo.id === action.todo.id) {
                todo.editable = false;
                todo.editedTitle = '';
            }
        })

        return {
            ...state,
            todos: [ ...state.todos ]
        }
    } else if (action.type === 'CHANGE_TODO_TITLE') {

        state.todos.map(todo => {
            if(todo.id === action.todo.id) {
                todo.editedTitle = action.todo.title;
            }
        })

        return {
            ...state,
            todos: [ ...state.todos ]
        }
    } else if (action.type === 'CHANGE_VISIBILITY') {
        return {
            ...state,
            visibility: parseInt(action.visibility)
        }
    }

    return state;
}

export default rootReducer;