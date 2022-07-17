import React from 'react';
import './add.css'

const AddToDos = (props) => {
    return (
        <div>

            <label for="validationDefault01 ">Do you have something in your mind ?</label>
            <input class="form-control" id="validationDefault01" type={"text"} name="task"
                value={props.todo}
                onChange={(e) => {
                    props.setTodo(e.target.value);
                }
                }
            />
            <input class="form-control" id="validationDefault01" type={'time'} name="task"
                value={props.todo}
                onChange={(e) => {
                    props.setTodo(e.target.value);
                }
                }
            />
            <input
                className='btn btn-primary' onClick={() => {
                    props.sumbit(props.id)

                }} type='submit' value="submit" />

        </div>
    )
}

export default AddToDos