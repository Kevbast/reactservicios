import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MenuRutas extends Component {
  render() {
    return (
        <div>
            <h1 style={{backgroundColor:"cyan"}}>MENÚ RUTAS </h1>
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/cursos'>Cursos Alumnos</NavLink></li>
            <li><NavLink to='/departempleado'>Departamentos de empleado</NavLink></li>
            <li><NavLink to='/tabla/21'>Tabla de multiplicar 21</NavLink></li>               
            <li><NavLink to='/tabla/33'>Tabla de multiplicar 33</NavLink></li>               
            <li><NavLink to='/collatz/22'>Conjetura collatz 22</NavLink></li>               
            <li><NavLink to='/collatz/77'>Conjetura collatz 77</NavLink></li>               
            <li><NavLink to='/hospmulti'>Hospital</NavLink></li>               
        </ul>
      </div>

    )
  }
}
