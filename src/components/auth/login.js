import './sign_in.css'
import React, { useEffect, useState } from 'react'
import './login.css'
import { uid } from 'uid'
import { db } from "../../firebase";
import { set, ref, onValue, remove } from 'firebase/database';
const LogIn = (props) => {
    const [user, setUser] = useState("")
    const [pwd, setPwd] = useState("")
    const [users, setUsers] = useState(null)
    const [exist, setExist] = useState(true);

    const uuid = uid();
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
    const form = <>
        <input type={"text"} placeholder='UserName' value={user} onChange={(e) => { setUser(e.target.value) }} />
        <input type={"password"} placeholder='Password' value={pwd} onChange={(e) => { setPwd(e.target.value) }} />
        <input className='btn btn-success'
            type='submit' value="Log In" onClick={() => {
                console.log(users.length)
                if (users.length === 0) setExist(false)
                else
                    if (users.find(client => client.user === user && client.pwd === pwd) !== undefined) {

                        console.log("user found")
                        sessionStorage.setItem('user', users.find(client => client.user === user && client.pwd === pwd))
                        console.log(sessionStorage.getItem("user"))
                    } else {
                        setExist(false)
                        console.log('user not found')
                    }
            }} /></>
    return (
        <div className='login'>

            <h2 className='login-title'>Log In</h2>
            {!exist ? <div>User Doesnt Exists In THE DB please log in
                <a href="/sign_in"> click here </a>
                {form}
            </div> : <>{form}</>
            }

        </div>
    )
}

export default LogIn