import React from 'react'
import './todo.css'

const Todo = (props) => {
    return (
        <div className='todo'>
            <h1>{props.todo} </h1>
            <h4>{props.date}</h4>
            <button type="button" class="btn btn-success">Success</button>
            <button type="button" onClick={
                () => {
                    props.del(props.value)
                }
            } class="btn btn-danger">Danger</button>
        </div>
    )
}

export default Todo