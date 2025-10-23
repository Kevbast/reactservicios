// Tendremos dos componentes. 
// Al iniciar el component, cargamos los Hospitales dentro de un <select> múltiple 
// Otro component en el que dibujaremos los trabajadores a partir de los hospitales seleccionados 

import React, { Component } from 'react'
import axios from 'axios'
import Global from '../../Global'
import Trabajadores from './Trabajadores'

export default class HospitalesMultiple extends Component {
    url=Global.apiTrabajadores;
    selectHospital=React.createRef();
    cajaSalario=React.createRef();//PARADA EL UPDATE
    state={
        hospitales:[],
        hospitalesSelect:[],
    }
    //lo vamos a  rellenar con los ids de los hospitales
    

    loadHospitales=()=>{
        let request="api/hospitales";
        axios.get(this.url+request).then(response=>{
            console.log("Cargando hospitales..")
            this.setState({
                hospitales:response.data
            })
        })
    }
    componentDidMount=()=>{
        this.loadHospitales();
    }

    getHospitalesSeleccionados=(event)=> {
        event.preventDefault();
        let aux=[];
        let options=this.selectHospital.current.options;
        for(var option of options){
            if(option.selected==true){
                aux.push(option.value);
            }
            console.log(aux)
        }
        this.setState({
            hospitalesSelect:aux
        })
    }
    //FUNCIÓN SALARIO DE LOS TRABAJADORES QUE LO HACEMOS DIRECTAMENTE EN EL
    updateSalarioTrabajadores=(event)=>{
        event.preventDefault();
        let salario=this.cajaSalario.current.value;
        let options=this.selectHospital.current.options;
        let aux="";
        for(var option of options){
            if(option.selected==true){
                aux+="idhospital="+option.value+"&";
            }           
        }
        aux=aux.substring(0,aux.length - 1);
        console.log(aux)
        //EMPEZAMOS CON LA REQUEST
        let request="api/trabajadores/updatesalariotrabajadoreshospitales?incremento="+salario+"&"+aux;
        console.log(request);
        axios.put(this.url+request).then(response=>{
            console.log("SALARIO ACTUALIZADO!!!");
            this.getHospitalesSeleccionados(event);//LLAMAMOS AL MÉTODO CON EL EVENT SI QUEREMOS VISUALIZAR            
        })
    }

  render() {
    return (
      <div>
        <h1>Hospitales Múltiples</h1>
            
        <form>

            <select ref={this.selectHospital} size="5" multiple className='form-control'>
            {
                this.state.hospitales.map((hospi,index)=>{
                    return(<option key={index} value={hospi.idHospital}>{hospi.nombre}</option>)
                })
            }
            </select>
            <button onClick={this.getHospitalesSeleccionados} className='btn btn-info'>Buscar hospitales</button>
            <label>Incremento Salario:</label>
            <input type='text' ref={this.cajaSalario}/>
            <button onClick={this.updateSalarioTrabajadores} className='btn btn-warning'>Incrementar salario</button>
        </form>
        {
            this.state.hospitalesSelect.length !=0 &&
            <Trabajadores idhospitales={this.state.hospitalesSelect}/>
        }
      </div>
    )
  }
}
