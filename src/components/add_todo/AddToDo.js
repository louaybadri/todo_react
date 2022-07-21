import React, { useEffect, useState } from 'react';
import "./AddToDo.css";
import { db } from "../../firebase";
import { set, ref, onValue, remove } from 'firebase/database';
import { uid } from 'uid';
import Todo from '../todos/todo';
import AddToDos from '../todos/add';
import SignIn from '../auth/sign_in';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogIn from '../auth/login';

// import { registerVersion } from 'firebase/app';
// import { uuidv4 } from '@firebase/util';



function AddToDo() {

    const uuid = uid();
    const addToDB = (data) => {
        set(ref(db, uuid),
            {
                todo: todo,
                date: data.date,
                id: uuid,
                completed: false,

            }
        )
        setTodo("")
    }
    const deleteFromdDB = (value) => {
        remove(ref(db, value.id))
    }
    // readFromDB()
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
        setTodo('')
    }
    const [date, setDate] = useState('00:00')
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    useEffect(() => {
        onValue(ref(db), snapshot => {
            setTodos([])
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(todo => {
                    setTodos((oldArray) => [...oldArray, todo])
                })
            }
        })
    }, todos)
    return (

        <div className='add-to-do'>
            <div className='add-to-do-body'>


                <div class="add-to-do-create col-lg-4 mb-3">
                    <AddToDos value={todo} setTodo={setTodo} setDate={setDate} sumbit={submit} date={date} />
                </div>

                {

                    todos.length !== 0
                        ? <div className='add-to-do-todos'>
                            {todos.map((value) => {
                                return (<>


                                    <Todo todo={value.todo} date={value.date} del={deleteFromdDB} value={value} />

                                </>
                                )

                            })


                            }

                        </div> : <></>}
            </div>
            {/* <SignIn /> */}
            <h1 className='todo-title'>TODO REACT</h1>

        </div>
    )
}


export default AddToDo