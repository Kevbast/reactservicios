import React, { Component } from 'react'
import Alumnos from './Alumnos'
import axios from 'axios'
import Global from '../../Global';

/**
 * Componente padre que gestiona la selección de cursos y visualización de alumnos.
 * Permite seleccionar un curso de una lista y muestra los detalles de un alumno seleccionado.
 * Implementa comunicación padre-hijo pasando props y funciones callback.
 */
export default class Cursos extends Component {

    // Referencia al elemento select para capturar el curso seleccionado
    selectCurso=React.createRef();   
    url=Global.urlCursoAlumnos;
    
    state={
        cursos:[],      // Array con la lista de cursos disponibles
        alumno:[],      // Objeto con los detalles del alumno seleccionado
        idCurso:0       // ID del curso seleccionado (0 = ninguno seleccionado)
    }
    
    /* Carga la lista de cursos disponibles desde la API.*/
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
    /**
     * Hook del ciclo de vida que se ejecuta después de montar el componente.
     * Carga la lista inicial de cursos.
     */
    componentDidMount=()=>{
        this.loadCursos();
    }

    /**
     * Maneja la selección de un curso del select.
     * Actualiza el state con el ID del curso seleccionado, lo que desencadena
     * la visualización del componente hijo Alumnos.
     * @param {Event} event - Evento del formulario
     */
    buscarAlumnos=(event)=>{
        event.preventDefault();
        // Obtenemos el valor del curso seleccionado desde la referencia
        let idCurso = this.selectCurso.current.value;
        console.log(idCurso)
        this.setState({
            idCurso:idCurso
        })
    }

    /**
     * Función callback que se pasa al componente hijo Alumnos.
     * Recibe el ID del alumno seleccionado desde el hijo y carga sus detalles.
     * Implementa comunicación hijo -> padre mediante callback.
     * @param {number} idAlumn - ID del alumno seleccionado
     */
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
        
        {/* Formulario para seleccionar un curso */}
        <form >
            <h2>Buscar por curso</h2>
            <label>Cursos: </label>
            <select ref={this.selectCurso}>
            {// Renderizamos dinámicamente las opciones del select con los cursos
                this.state.cursos.map((curso,index)=>{
                    return(<option key={index} value={curso}>{curso}</option>)
                })
            }
            </select>
            <button onClick={this.buscarAlumnos}>Buscar ALUMNOS</button>
        </form>

        {/* Sección de detalles del alumno seleccionado */}
        <h1>{this.state.alumno.nombre}</h1>
        <h2>Id alumno:{this.state.alumno.idAlumno}</h2>
        <img src={this.state.alumno.imagen} style={{width:"250px",height:"200px"}} alt={this.state.alumno.nombre}/>

        {/* 
            Renderizado condicional del componente hijo Alumnos.
            Solo se muestra si hay un curso seleccionado (idCurso !== 0).
            Se pasan dos props:
            - idcurso: ID del curso seleccionado (comunicación padre -> hijo)
            - detailsAlumn: función callback para recibir el alumno seleccionado (comunicación hijo -> padre)
        */}
        {
            this.state.idCurso != 0 &&
            <Alumnos idcurso={this.state.idCurso} detailsAlumn={this.detailsAlumno}/>
        }
      </div>
    )
  }
}
