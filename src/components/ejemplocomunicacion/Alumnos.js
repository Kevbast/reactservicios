import React, { Component } from 'react'
import Global from '../../Global'
import axios from 'axios'

export default class Alumnos extends Component {

    url=Global.urlCursoAlumnos;

    state={
        alumnos:[]
    }

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
    //Nota: NUNCA cambiaremos el state dentro de componentDidUpdate() SIN UN IF
    componentDidUpdate=(oldProps)=>{
        console.log("Current: "+ this.props.idcurso);
        console.log("Old props: "+ oldProps.idcurso);
        if(oldProps.idcurso !=this.props.idcurso){
            this.loadAlumnos();
        }
    }
    componentDidMount = () => { 
    console.log("Cargando alumnos..."); 
    this.loadAlumnos(); 
    } 
    

  render() {
    return (
    <div>
        <h1 style={{color:"red"}}>Alumnos component(hijo) Curso: {this.props.idcurso}</h1>
        <ul>
            {   //AQUÍ VISUALIZAMOS LA LISTA DE ALUMNOS GRACIAS AL ID PASADO POR EL PADRE
                this.state.alumnos.map((alumn,index)=>{
                    return (<li key={index}>
                    {alumn.nombre} - {alumn.apellidos}-<button onClick={()=>{//HACEMOS UNA FUNCIÓN POR LAMBDA
                      var index =parseInt(alumn.idAlumno);
                      this.props.detailsAlumn(index) //EN VEZ DEL ID PODRÍAMOS PASAR SIMPLEMENTE EL OBJETO Y YA 
                    }}>Detalles</button> </li>)
                      
                })
            }
        </ul>      
    </div>
    )}
}
