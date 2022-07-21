import React, { useEffect, useState } from 'react'
import './login.css'
import { uid } from 'uid'
import { db } from "../../firebase";
import { set, ref, onValue, remove } from 'firebase/database';
const SignIn = () => {
    const [user, setUser] = useState("")
    const [pwd, setPwd] = useState("")
    const [users, setUsers] = useState([])
    const [exist, setExist] = useState(false)
    const uuid = uid();

    const addUserToBD = (userName, pwd) => {
        users.find(user => user.user === userName && user.pwd === pwd) !== undefined ?
            // console.log('exist')
            setExist(true)
            :
            // console.log('nop')
            set(ref(db, uuid),
                {
                    user: userName,
                    pwd: pwd,
                    id: uuid,
                }
            )
        setUser("");
        setPwd('')

    }
    const readFromDB = () => {
        onValue(ref(db), snapshot => {
            setUsers([])
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(user => {
                    setUsers((oldArray) => [...oldArray, user])
                })
            }
        })
    }
    useEffect(() => {
        onValue(ref(db), snapshot => {
            setUsers([])
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(user => {
                    setUsers((oldArray) => [...oldArray, user])
                })
            }
        })
    }, [])
    return (
        <div className='login'>
            <h2 className='login-title'>Sign In</h2>
            {exist ? <div>User Exists In THE DB please log in
                <a href="/login"> click here </a>
            </div> : <><input type={"text"} placeholder='UserName' value={user} onChange={(e) => { setUser(e.target.value) }} />
                <input type={"password"} placeholder='Password' value={pwd} onChange={(e) => { setPwd(e.target.value) }} />
                <input className='btn btn-success'
                    type='submit' value="Sign In" onClick={() => {
                        addUserToBD(user, pwd)
                    }} /></>
            }
        </div>
    )
}

export default SignIn