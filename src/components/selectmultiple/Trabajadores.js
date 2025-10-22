import React, { Component } from 'react'
import Global from '../../Global';
import axios from 'axios';
export default class Trabajadores extends Component {
    url=Global.apiTrabajadores
    state={
        mensaje:"",
        trabajadores:[]
    }

    loadTrabajadores=()=>{
        //RECUPERAMOS EL ARRAY DE IDS DE HOSPITALES
        let idhospitales= this.props.idhospitales;
        let data ="";
        for(var id of idhospitales){
            data+= "idhospital="+id +"&"
        }
        //idhospital=18&idhospital=22&idhospital=45&idhospital=17&
        //ELIMINAMOS EL ÚLTIMO CARÁCTER DEL STRING
        data= data.substring(0,data.length - 1);
        this.setState({
            mensaje:data
        })
        //PROCEDEMOS CON LA PETICIÓN
        let request="api/trabajadores/trabajadoreshospitales?"+data;
        axios.get(this.url+request).then(response=>{
            console.log("CARGAND TRABAJADORES");
            this.setState({
                trabajadores:response.data
            })
        })
    }
    componentDidMount=()=>{
        this.loadTrabajadores();
    }

    componentDidUpdate=(oldProps)=>{
        if(oldProps.idhospitales!=this.props.idhospitales){
            this.loadTrabajadores();
        }
    }

  render() {
    return (
      <div>Trabajadores
        <h2>{this.state.mensaje}</h2>

        <div
            className="table-responsive">
            <table
                className="table table-primary">
                <thead>
                    <tr>
                        <th scope="col">Apellido</th>
                        <th scope="col">Oficio</th>
                        <th scope="col">Salario</th>
                        <th scope="col">Id hospital</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.trabajadores.map((worker,index)=>{
                            return(<tr key={index}>
                                <td>{worker.apellido}</td>
                                <td>{worker.oficio}</td>
                                <td>{worker.salario}</td>
                                <td>{worker.idHospital}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
        
      </div>
    )
  }
}
