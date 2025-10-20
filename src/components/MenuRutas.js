import React, { Component } from 'react'

export default class MenuRutas extends Component {
  render() {
    return (
        <div>
            <h1 style={{backgroundColor:"cyan"}}>MENÚ RUTAS </h1>
        <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/tabla/21'>Tabla de multiplicar 21</a></li>               
            <li><a href='/tabla/33'>Tabla de multiplicar 33</a></li>               
            <li><a href='/collatz/22'>Conjetura collatz 22</a></li>               
            <li><a href='/collatz/77'>Conjetura collatz 77</a></li>               
        </ul>
      </div>

    )
  }
}
