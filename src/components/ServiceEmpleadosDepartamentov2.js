import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global';

export default class ServiceEmpleadosDepartamentov2 extends Component {
    selectDept=React.createRef();
    url=Global.urlEmpleados;
    urlDepartamentos=Global.urlDepartamentos;
    
    state={
        empleados:[],//donde van a estar todos los proveedores
        departamentos:[]
    }
    
    mostrarEmpleados=(event)=>{
        event.preventDefault();
        let idDept=this.selectDept.current.value;
        console.log(idDept)
        //request empleados por id del departamento
        var requestEmpleadoDept="api/Empleados/EmpleadosDepartamento/"+idDept;
        axios.get(this.url+requestEmpleadoDept).then(response=>{
            console.log("Leyendo Servicio");
            console.log(response.data);
            //console.log(response.data[0]);
            
            this.setState({
                empleados:response.data//NO ESTÁ DENTRO DE VALUE,SIMPLEMENTE ESTÁ EN DATA//REVISAR EL API
            })
        })
    }

    //CARGAMOS PREVIAMENTE LA LISTA DE LOS DEPARTAMENTOS
    loadDepartamentos=()=>{
        let request="webresources/departamentos";
        console.log("Antes del servicio");
        //console.log(kevin) THIS.KEVIN!!
        axios.get(this.urlDepartamentos+request).then(response=>{
            console.log("Leyendo servicio")
            console.log(response.data)
            this.setState({
                departamentos:response.data
            })
        })
    }

    componentDidMount=()=>{
        this.loadDepartamentos();
    }

   


  render() {
    return (
      <div>
        <h1>ServiceEmpleadosDepartamento</h1>

        <form >
            <h2>Buscar por id departamento</h2>
            <label>Id: </label>
            <select ref={this.selectDept}>
            {
                this.state.departamentos.map((dept,index)=>{
                    return(<option key={index} value={dept.numero}>{dept.nombre}</option>)
                })
            }
            </select>
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
