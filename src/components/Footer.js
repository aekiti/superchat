import React, { Component } from 'react';
import { connect } from 'react-redux';
import visibility from './../configs/visibility'

export class Footer extends Component {

    render() {

        let remainingToDos = 0;
        this.props.todos.map(todo => {
            if(todo.isCompleted === visibility.ACTIVE) {
                remainingToDos++;
            }
        })

        return <span className="todo-count">
            <strong>{ remainingToDos }</strong> { remainingToDos === 1 ? 'item' : 'items'} left
        </span>
    }
}

const mapStateToPros = (state) => {
    return state;
}

export default connect(mapStateToPros)(Footer)
