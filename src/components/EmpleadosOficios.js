import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global';

export default class EmpleadosOficios extends Component {
    selectDept=React.createRef();
    url=Global.urlEmpleados;
    urlDepartamentos=Global.urlDepartamentos;
    
    state={
        empleados:[],//donde van a estar todos los proveedores
        oficios:[]
    }
    
    mostrarEmpleados=(event)=>{
        event.preventDefault();
        let ofiempleados=this.selectDept.current.value;
        console.log(ofiempleados)
        //request empleados por id del departamento
        var request="api/Empleados/EmpleadosOficio/"+ ofiempleados;
        axios.get(this.url+request).then(response=>{
            console.log("Leyendo Servicio");
            console.log(response.data);
            //console.log(response.data[0]);
            this.setState({
                empleados:response.data//NO ESTÁ DENTRO DE VALUE,SIMPLEMENTE ESTÁ EN DATA//REVISAR EL API
            })
        })
    }

    //CARGAMOS PREVIAMENTE LA LISTA DE LOS DEPARTAMENTOS
    loadOficios=()=>{
        let request="api/Empleados";
        console.log("Antes del servicio");
        
        //console.log(kevin) THIS.KEVIN!!
        axios.get(this.url+request).then(response=>{
            console.log("Leyendo servicio")
            console.log(response.data)
            var ofiaux=[];
            var empleados=response.data
            //función filtro para los oficios de los empleados
            empleados.forEach((empleado) => {
                if(!ofiaux.includes(empleado.oficio)){
                    ofiaux.push(empleado.oficio);
                    console.log(ofiaux);//MIRAR BIEN EL FILTRO
                }
            });

            this.setState({
                oficios:ofiaux,
            })
        })
        
    }

    componentDidMount=()=>{
        this.loadOficios();
    }

  render() {
    return (
      <div>
        <h1>ServiceEmpleadosDepartamento</h1>

        <form >
            <h2>Buscar por empleados por oficio</h2>
            <label>Id: </label>
            <select ref={this.selectDept}>
            {
                
                this.state.oficios.map((ofi,index)=>{
                    return(<option key={index} value={ofi}>{ofi}</option>)
                })
            }
            </select>
            <button onClick={this.mostrarEmpleados}>Buscar empleados</button>
        </form>
        
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
