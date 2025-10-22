import React, { Component } from 'react'
import axios from 'axios'
import Global from '../../Global';

export default class Empleados extends Component {
    //llamamos a empleados 
    url=Global.urlEmpleados;

    state={
        empleados:[],
        texto:" "//la creamos para el didupdate
    }

    loadEmpleados=()=>{
        let idDepartamento= this.props.iddepartamento;
        var request="api/Empleados/EmpleadosDepartamento/"+idDepartamento;
        axios.get(this.url+request).then(response =>{
            console.log("Leyendo empleados");
            this.setState({
                empleados:response.data
            })
        })
    }
    //COMO PODEMOS COMPROBAR ESTÁ ACTUALIZANDO EL DIBUJO PERO NO LA CARGA DE DATOS CON EL DIDMOUNT,POR LO TANTO HAY QUE CAMBIAR
    //Nota: NUNCA cambiaremos el state dentro de componentDidUpdate() SIN UN IF 
    componentDidUpdate=(oldProps)=>{
        console.log("Current: "+ this.props.iddepartamento);
        console.log("Old props: "+ oldProps.iddepartamento);
        if(oldProps.iddepartamento !=this.props.iddepartamento){

            this.loadEmpleados();
            // this.setState({
            // texto:"Update "+ this.props.iddepartamento
            // })
        }
    }

    componentDidMount = () => { 
    console.log("Cargando component"); 
    this.loadEmpleados(); 
    } 

  render() {
    return (
      <div>

        <h1 style={{color:"red"}}>Empleados Component {this.props.iddepartamento}</h1>
        
        {/* <h1 style={{color:"green"}}>Empleados Component {this.state.texto}</h1>  VEMOS QUE ESTO DA ERROR */}
        <table border="1" style={{textAlign:"center"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Apellido</th>
                        <th>Departamento</th>
                        <th>Salario</th>
                    </tr>
                </thead>            
            <tbody>
                {
                    this.state.empleados.map((emp,index)=>{
                    return(<tr key={index}>
                           <td> {emp.idEmpleado} </td>
                           <td> {emp.apellido} </td>
                           <td> {emp.departamento} </td>
                           <td> {emp.salario}</td>
                        </tr>)
                    })                  
                }
            </tbody>
        </table>
      </div>
    )
  }
}
