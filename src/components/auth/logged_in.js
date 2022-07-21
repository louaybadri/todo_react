import React from 'react'
import { Link } from 'react-router-dom'
import "./logged_in.css"
const LoggedIn = (props) => {
    return (
        <div>
            <h2> Welcome To Your TODO Web Site </h2>
            <h3 className='logged-in'>{props.name}</h3>
            <Link to='/todos'><button type={'button'} > Check Your Todos</button></Link>
            <a onClick={() => {
                sessionStorage.removeItem('user')
            }} to='/login'><button type={'button'} > Log Out</button></a>
        </div>
    )
}

export default LoggedIn