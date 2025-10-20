import React, { Component } from 'react'
import Alumnos from './Alumnos'
import axios from 'axios'
import Global from '../../Global';

export default class Cursos extends Component {

    selectCurso=React.createRef();
    url=Global.urlCursoAlumnos;
    state={
        cursos:[],
        alumno:[],
        idCurso:0 //lo creamos en el state,puesto que cambiará
    }
    loadCursos=()=>{
        let request="api/Alumnos/Cursos";
        console.log("Antes del servicio de cursos...");
        axios.get(this.url+request).then(response=>{
            console.log("Leyendo servicio")
            console.log(response.data)
            this.setState({
                cursos:response.data
            })
        })
    }
    componentDidMount=()=>{
        this.loadCursos();
    }

    //Creamos método para buscar los alumnos para pasarlo
    buscarAlumnos=(event)=>{
        event.preventDefault();
        let idCurso = this.selectCurso.current.value;//RECOGEMOS EL VALOR DEL SELECT
        console.log(idCurso)
        this.setState({
            idCurso:idCurso
        })
    }

    //FUNCIÓN QUE CREAMOS EN EL PADRE PERO QUE RECIBIMOS EL VALOR EN EL HIJO PARA VISUALIZAR LOS DATOS DEL ALUMNO
    detailsAlumno=(idAlumn)=>{
    console.log("Padre tiene a id alumn:"+ idAlumn);
    var request="api/Alumnos/FindAlumno/"+idAlumn
    axios.get(this.url+request).then(response=>{
            console.log("Leyendo servicio details alumno...")
            console.log(response.data)
            this.setState({
                alumno:response.data
            })
        })

    }

  render() {
    return (
      <div>
        <h1 style={{color:"blue"}}>Cursos component select(padre)</h1>
        <form >
            <h2>Buscar por curso</h2>
            <label>Cursos: </label>
            <select ref={this.selectCurso}>
            {
                this.state.cursos.map((curso,index)=>{
                    return(<option key={index} value={curso}>{curso}</option>)
                })
            }
            </select>
            <button onClick={this.buscarAlumnos}>Buscar ALUMNOS</button>
        </form>

        {/* AQUI ES LA ULTIMA PARTE DEL EJERCICIO,DONDE RECOGEMOS LOS DETALLES DEL ALUMNO ELEGIDO EN CONCRETO */}
        <h1>{this.state.alumno.nombre}</h1>
        <h2>Id alumno:{this.state.alumno.idAlumno}</h2>
        <img src={this.state.alumno.imagen} style={{width:"250px",height:"200px"}}/>

            {//SI ES 0 PUES QUE NO SE MUESTRE EL COMPONENT VISUALIZAMOS LA LISTA DE ALUMNS
             this.state.idCurso !=0 &&
            <Alumnos idcurso={this.state.idCurso} detailsAlumn={this.detailsAlumno}/>//pasamos la función details,para que luego la devolvamos
            }

            
      </div>
    )
  }
}
