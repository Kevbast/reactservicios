import React, { Component } from 'react'
import Global from '../../Global'
import axios from 'axios'

/**
 * Componente hijo que muestra la lista de alumnos de un curso específico.
 * Recibe el ID del curso como prop del componente padre y notifica al padre
 * cuando se selecciona un alumno mediante una función callback.
 * 
 * Props esperadas:
 * @prop {string|number} idcurso - ID del curso del que se mostrarán los alumnos
 * @prop {function} detailsAlumn - Función callback para notificar al padre sobre el alumno seleccionado
 */
export default class Alumnos extends Component {

    url=Global.urlCursoAlumnos;

    state={
        alumnos:[]  // Array con la lista de alumnos del curso seleccionado
    }

    /**
     * Carga la lista de alumnos del curso especificado desde la API.
     * Utiliza el ID del curso recibido como prop del componente padre.
     */
    loadAlumnos=()=>{
        let idcurso=this.props.idcurso;
        var request="api/Alumnos/FiltrarCurso/"+ idcurso;
        axios.get(this.url+request).then(response =>{
            console.log("Leyendo alumnos");
            this.setState({
                alumnos:response.data
            })
        })
    }
    
    /**
     * Hook del ciclo de vida que se ejecuta después de actualizar el componente.
     * Detecta cambios en las props y recarga los alumnos si el curso ha cambiado.
     * IMPORTANTE: Siempre comparar las props antiguas con las nuevas antes de actualizar
     * el state para evitar bucles infinitos de renderizado.
     * @param {Object} oldProps - Props anteriores antes de la actualización
     */
    componentDidUpdate=(oldProps)=>{
        console.log("Current: "+ this.props.idcurso);
        console.log("Old props: "+ oldProps.idcurso);
        // Solo recargamos si el ID del curso ha cambiado
        if(oldProps.idcurso != this.props.idcurso){
            this.loadAlumnos();
        }
    }
    /**
     * Hook del ciclo de vida que se ejecuta después de montar el componente.
     * Carga la lista inicial de alumnos del curso.
     */
    componentDidMount = () => { 
        console.log("Cargando alumnos..."); 
        this.loadAlumnos(); 
    } 
    
  render() {
    return (
    <div>
        <h1 style={{color:"red"}}>Alumnos component(hijo) Curso: {this.props.idcurso}</h1>
        <ul>
            {
                // Renderizamos la lista de alumnos obtenidos del curso
                this.state.alumnos.map((alumn,index)=>{
                    return (
                        <li key={index}>
                            {alumn.nombre} - {alumn.apellidos}
                            {/* 
                                Botón para solicitar los detalles del alumno.
                                Utiliza una función arrow para ejecutar el callback del padre,
                                implementando comunicación hijo -> padre.
                                Nota: Se podría pasar el objeto completo en lugar del ID.
                            */}
                            <button onClick={()=>{
                                var idAlumno = parseInt(alumn.idAlumno);
                                this.props.detailsAlumn(idAlumno);
                            }}>Detalles</button>
                        </li>
                    )
                })
            }
        </ul>      
    </div>
    )}
}
