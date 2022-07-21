import React, { useState } from 'react';
import './add.css';


const AddToDos = (props) => {
    const [_todo, set_todo] = useState('')
    const setGenTodo = (todo) => {
        set_todo(todo)
        props.setTodo(todo)
    }
    return (
        <div>

            <label for="validationDefault01 ">Do you have something in your mind ?</label>
            <input class="form-control" id="validationDefault01" type={"text"} name="task"
                value={_todo}
                onChange={(e) => {
                    setGenTodo(
                        e.target.value)
                }
                }
            />
            {/* <input type={'time'} onChange={(e) => {
                props.setDate(e.target.value)
            }}
                color={"red"}
            /> */}
            <input type={'datetime-local'} onChange={(e) => {
                props.setDate(e.target.value)
            }} />
            <input
                className='btn btn-primary' onClick={() => {
                    props.sumbit({ date: props.date })
                    set_todo('')


                }} type='submit' value="Add" />

        </div>
    )
}

export default AddToDos