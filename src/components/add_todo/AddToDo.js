import React, { useEffect, useState } from 'react';
import "./AddToDo.css";
import { db } from "../../firebase";
import { set, ref, onValue, remove } from 'firebase/database';
import { uid } from 'uid';
import Todo from '../todos/todo';
import AddToDos from '../todos/add';

// import { registerVersion } from 'firebase/app';
// import { uuidv4 } from '@firebase/util';



function AddToDo() {
    const uuid = uid();
    const addToDB = (id) => {
        set(ref(db, uuid),
            {
                todo: todo,
                date: date,
                id: uuid
            }
        )
        setTodo("")
    }
    const deleteFromdDB = (value) => {
        remove(ref(db, value.id))
    }
    const readFromDB = () => {
        onValue(ref(db), snapshot => {
            setTodos([])
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(todo => {
                    setTodos((oldArray) => [...oldArray, todo])
                })
            }
        })
    }
    const submit = (id) => {
        addToDB(id);
        setId(id + 1);
        readFromDB();
    }
    const [id, setId] = useState(1)
    const [date, setDate] = useState(Date.now())
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    return (

        <div className='add-to-do'>

            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Active</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
            <div className='add-to-do-body'>

                <div class="add-to-do-create col-lg-4 mb-3">
                    <AddToDos value={todo} setTodo={setTodo} sumbit={submit} id={id} /></div>
                {todos.length !== 0 ? <div className='add-to-do-todos'>
                    {todos.map((value) => {
                        return (<>


                            <Todo todo={value.todo} date={value.date} del={deleteFromdDB} value={value} />
                        </>
                        )

                    })


                    }

                </div> : <></>}
            </div>
            <h1 className='todo-title'>TODO REACT</h1>

        </div>
    )
}


export default AddToDo