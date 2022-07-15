import React, { useEffect, useState } from 'react';
import "./AddToDo.css";
import { db } from "../../firebase";
import { set, ref, onValue, remove } from 'firebase/database';
import { uid } from 'uid';
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

    const [id, setId] = useState(1)
    const [date, setDate] = useState(Date.now())
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    return (

        <div className='todo'>
            <div >
                <header className='title'>AddToDo</header>
                <label for="task">
                    Add Task<input type={"text"} name="task"
                        value={todo}
                        onChange={(e) => {
                            setTodo(e.target.value);
                        }
                        }
                    />
                </label>
                {/* <input class="form-control" id="kt_timepicker_4" readonly value="10:30:20 AM" type="text" /> */}
                <input onClick={() => {
                    addToDB(id);
                    setId(id + 1);
                    readFromDB();

                }} type='submit' value="submit" />

            </div >
            <div className='todos'>
                {todos.map((value) => {
                    return (<>
                        < h1 > {value.todo} at {value.date}</h1>
                        <input type={'button'} value='delete' onClick={
                            () => {
                                deleteFromdDB(value);
                            }
                        } />
                    </>)

                })


                }
            </div>
        </div>
    )
}


export default AddToDo