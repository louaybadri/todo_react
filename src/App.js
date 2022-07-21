import './App.css';
import AddToDo from './components/add_todo/AddToDo';
import LogIn from './components/auth/login';
import SignIn from './components/auth/sign_in';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoggedIn from './components/auth/logged_in';

function App() {

  return (
    <div className="App">
      <ul className="nav justify-content-center ">
        <li className="nav-item">
          <a className="nav-link active" href="/login">Log In</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/sign_in">Sign In</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">See Completed Task</a>
        </li>
      </ul>
      <BrowserRouter>
        <Routes>
          <Route element={<LoggedIn />} path="/">

          </Route>

          <Route element={sessionStorage.getItem("user") !== null ? <Navigate replace to={"/"} /> : <LogIn />} path="/login">

          </Route>

          <Route element={sessionStorage.getItem("user") !== null ? <Navigate replace to={"/"} /> : <SignIn />} path="/sign_in">

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
