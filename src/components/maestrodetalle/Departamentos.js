import React, { Component } from 'react'
import Empleados from './Empleados'
import axios from 'axios'
import Global from '../../Global';

export default class Departamentos extends Component {

    selectDept=React.createRef();//cogemos referencia al select para recoger su value
    url=Global.urlEmpleados;
    urlDepartamentos=Global.urlDepartamentos;
    
    state={
        departamentos:[],
        idDepartamento:0 //lo creamos en el state,puesto que cambiará
    }
    loadDepartamentos=()=>{
        let request="webresources/departamentos";
        console.log("Antes del servicio");

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

    //creamos método para busacr los empleados

    busacrEmpleados=(event)=>{
        event.preventDefault();
        let idDepartamento = this.selectDept.current.value;
        this.setState({
            idDepartamento:idDepartamento
        })
    }


  render() {
    return (
      <div>
        <h1 style={{color:"blue"}}>Departamentos component</h1>
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
            <button onClick={this.busacrEmpleados}>Buscar empleados</button>
        </form>
        {//SI ES 0 PUES QUE NO SE MUESTRE EL COMPONENT
            this.state.idDepartamento !=0 &&
            <Empleados iddepartamento={this.state.idDepartamento}/>
        }
        
      </div>
    )
  }
}
