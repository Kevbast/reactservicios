import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global';

export default class ServiceEmpleadosDepartamento extends Component {
    cajaid=React.createRef();
    url=Global.urlEmpleados;

    state={
        empleados:[],//donde van a estar todos los proveedores
        
    }
    
    mostrarEmpleados=(event)=>{
        event.preventDefault();
        let idDept=this.cajaid.current.value;
        console.log(idDept)
        //request empleados por id del departamento
        var requestEmpleadoDept="api/Empleados/EmpleadosDepartamento/"+idDept;
        axios.get(this.url+requestEmpleadoDept).then(response=>{
            console.log("Leyendo Servicio");
            console.log(response.data);

            this.setState({
                empleados:response.data//NO TE DEVUELVE UN VALUE,SI NO VARIOS OBJETOS
            })
        })
    }
  render() {
    return (
      <div>
        <h1>ServiceEmpleadosDepartamento</h1>

        <form >
            <h2>Buscar por id departamento</h2>
            <label>Id: </label>
            <input type="text" ref={this.cajaid}/>
            <button onClick={this.mostrarEmpleados}>Buscar empleados</button>
        </form>
        <ul>
        {
            this.state.empleados.map((emp,index)=>{
                return(<li key={index}>{emp.apellido}</li>)
            })
        }
        </ul>
      </div>
    )
  }
}
